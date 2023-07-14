import styled from "styled-components"
import Header from "../components/Header"
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { headersAuth, pages, requisitions } from "../routes/routes";
import axios from "axios";
import { validateUser } from "../constants/functions";

export default function HomePage() {

  const navigate = useNavigate();

  const {user, setUser} = useContext(AuthContext)

  const [products, setProducts] = useState(undefined)

  useEffect(() => {

    validateUser(user, setUser);

      axios.get(requisitions.getProducts, headersAuth(user.token))
        .then(res => setProducts(res.data))
        .catch(error => {
          navigate(pages.signIn);
          alert(error.response.data);
        });
    
  }, [user]);

  function openProductId(productId) {
    navigate(pages.product + productId)
  }

  console.log('products em home:', products)

  if(products === undefined) {
    return (
    <h1>Ta carregando</h1>
    )
  }

  return (
    <HomeContainer>
    <Header />
      <h1>Lista de Produtos</h1>
      <br />
    <ProductContainer>
      {products.map((item, index) => (
      <ProductBox 
      key={index}
      onClick={() => openProductId(item._id)}
      >
        <Image src={item.image}/>
        <div>{item.title}</div>
        <div>{item.price}</div>
      </ProductBox>
    ))}
    </ProductContainer>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  height: 100vh;
`

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const ProductBox = styled.div`
  border: 1px solid black;
  cursor: pointer;
`

const Image = styled.img`
  width: 250px
`