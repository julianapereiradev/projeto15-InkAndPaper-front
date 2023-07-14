import styled from "styled-components"
import Header from "../components/Header"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../contexts/AuthContext"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { headersAuth, pages, requisitions } from "../routes/routes"
import { ThreeDots } from "react-loader-spinner"
import { validateUser } from "../constants/functions"

export default function ProductPage() {
  const { user, setUser } = useContext(AuthContext);
  const [product, setProduct] = useState(undefined);
  const [shopQauntity, setShopQuantity] = useState(1);
  const [mayISubmit, setMayISubmit] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    validateUser(user, setUser);

    axios.get(requisitions.getProduct + id, headersAuth(user.token))
      .then(resp => setProduct(resp.data))
      .catch(error => {
        alert(error.response.data);
        navigate(pages.signIn);
      });
  }, [user])

  function HandleSubmit(e) {
    e.preventDefault();
    setMayISubmit(false);
    const informations = {id, shopQauntity}

    axios.post(requisitions.updateShoppingCart, informations, headersAuth(user.token))
      .then(resp => navigate(pages.home))
      .catch(error => {
        alert(error.response.data);
        setMayISubmit(true);
      })
  }

  return (
    <ProductContainer>
      <Header />
      {product ? (
        <>
          <h1>{product.title}</h1>
          <img src={product.image} alt="Imagem do produto" />
          <span>
            Preço: R${product.price.toFixed(2)} Quantidade disponível: {product.quantityInStock}
          </span>
          <span>
            Autor: {product.author} Gênero: {product.gender}
          </span>
          <span>
            Editora: {product.publisher} Ano de lançamento: {product.year}
          </span>

          <form onSubmit={e => HandleSubmit(e)}>
            <div>
              <button type="button" onClick={() => setShopQuantity(shopQauntity - (shopQauntity > 1 ? 1 : 0))}>
                -
              </button>

              <input
                type="number"
                required
                value={shopQauntity}
                onChange={e => setShopQuantity(e.target.value)}
              />

              <button type="button" onClick={() => setShopQuantity(shopQauntity + (shopQauntity < product.quantityInStock ? 1 : 0))}>
                +
              </button>
            </div>

            <button type="submit" disabled={!mayISubmit}>
              Adicionar ao Carrinho
            </button>
            <button type="button" onClick={() => navigate(pages.shoppingCart)} disabled={!mayISubmit}>
              Comprar agora
            </button>
          </form>

        </>
      ) : (
        <ThreeDots type="ThreeDots" color="#af0d0d" height={20} width={50} />
      )}
    </ProductContainer>
  )
}

const ProductContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  image {
    width: 30vw;
  }
`