import styled from "styled-components"
import Header from "../../components/Header"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../contexts/AuthContext"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { headersAuth, pages, requisitions } from "../../routes/routes"
import { ThreeDots } from "react-loader-spinner"
import { validateUser } from "../../constants/functions"
import Form from "./Form"

export default function ProductPage() {
  const { user, setUser } = useContext(AuthContext);
  const [product, setProduct] = useState(undefined);
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

  return (
    <>
      <ProductContainer>
        <Header />
        {product ? (
          <ProductBox>
            <img src={product.image} alt="Imagem do produto" />

            <InfoContainer>
              <ProductInfos>
                <span><strong>Título: </strong>{product.title}</span>
                <span><strong>Descrição: </strong>{product.description}</span>
                <span><strong>Autor: </strong>{product.author}</span>
                <span><strong>Gênero: </strong>{product.gender}</span>
                <span><strong>Editora/Ano: </strong>{product.publisher}, {product.year}</span>
              </ProductInfos>

              <Form id={id} token={user.token} product={product}/>
            </InfoContainer>


          </ProductBox>
        ) : (
          <ThreeDots type="ThreeDots" color="#F6E4C4" height={90} width={150} />
        )}
      </ProductContainer>
    </>
  )
}

const ProductContainer = styled.div`
  margin-top: 15vh;
  height: 85vh;
  background-color: #1F1712;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProductBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  img {
    width: 28vw;
    height: 73vh;
    border: 5px solid #F6E4C4;
  }
`

const InfoContainer = styled.section`
  width: 57vw;
  height: 73vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ProductInfos = styled.div`
  width: 100%;
  border: 1px solid #F6E4C4;
  color: #FFF;
  font-family: Inika, serif;
  font-size: 2.2vh;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 15px 0;

  strong {
    font-weight: 700;
  }

  span {
    margin: 10px;
  }
`
