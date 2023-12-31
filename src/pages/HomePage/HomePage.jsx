import styled from "styled-components"
import Header from "../../components/Header"
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { headersAuth, pages, requisitions } from "../../routes/routes";
import axios from "axios";
import { validateUser } from "../../constants/functions";
import Product from "./Product";
import { ThreeDots } from "react-loader-spinner";

export default function HomePage() {

  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext)

  const [products, setProducts] = useState(undefined)

  useEffect(() => {

    validateUser(user, setUser);
    const isValidUser = (user !== 0 && user)

    isValidUser && axios.get(requisitions.getProducts, headersAuth(user.token))
      .then(res => setProducts(res.data))
      .catch(error => {
        navigate(pages.signIn);
        alert(error.response.data);
      });

  }, [user]);

  return (
    <HomeContainer>
      <Header />
      
      <ProductContainer>
        <ProductMain>
          {products ? (
            products.map(item => <Product key={item._id} item={item}/>)
          ) : (
            <ThreeDots type="ThreeDots" color="#F6E4C4" height={90} width={150} />
          )}
        </ProductMain>
      </ProductContainer>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  margin-top: 70px;
  background-color: #1F1712;
  color: white;
  display: flex;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const ProductContainer = styled.div`
  width: 100%;
  display: flex;

`

const ProductMain = styled.div`
  width: 100vw;
  min-height: 80vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 10px;
`