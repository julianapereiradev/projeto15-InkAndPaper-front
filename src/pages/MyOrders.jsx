import styled from "styled-components"
import Header from "../components/Header"
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import { requisitions, pages } from '../routes/routes';
import { validateUser } from '../constants/functions';
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";


export default function CheckoutPage() {
  const { user, setUser } = useContext(AuthContext);
  const [checkoutItems, setCheckoutItems] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    validateUser(user, setUser);  
    fetchCheckoutItems();
  }, [user]);

  const fetchCheckoutItems = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get(requisitions.myOrders, config);
      setCheckoutItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const goToHomepage = () => {
    navigate(pages.home);
  }

  return (
    <Container>
      <Header />
      <Title>
        <h2>Confira abaixo todos os seus pedidos:</h2>
      </Title>
      <Info>
        {checkoutItems ? (checkoutItems.map((item) => (
          <CheckoutItem key={item._id}>

            <Details>
            <h3>Informações Gerais:</h3>
              <p><strong>Data e hora da compra:</strong> {item.purchaseDateTime}</p>
              <p><strong>Método de pagamento:</strong> {item.paymentData}</p>
              <p><strong>Endereço:</strong> {item.address} - {item.addressComp}</p>
            </Details>
            <h3>Itens do carrinho:</h3>
            {item.cartItems.map((cartItem) => (
              <CartItem key={cartItem.productId}>
                <p>• Título: <strong>{cartItem.title}</strong></p>
                <p>- Quantidade: {cartItem.quantity}</p>
                <p>- Preço total do item: R$ {((cartItem.price) * (cartItem.quantity)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </CartItem>
            ))}
          </CheckoutItem>
        ))) : (
        <ThreeDots type="ThreeDots" color="#F6E4C4" height={90} width={150} />
        )}
      </Info>
      <ButtonDiv>
        <Back onClick={goToHomepage}>Voltar à loja</Back>
      </ButtonDiv>
    </Container>
  );
};

const Container = styled.div`
  background-color: #1F1712;
  font-family: 'Inika';
  color: #ffffff;
  `;

const Title = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 20px;
margin-top: 90px;
margin-bottom: 30px;

  h1{
    font-size: 48px;
  }
  h2{
    font-size: 24px;
  }
`

const Info = styled.div`
font-size: 20px;
display: flex;
flex-direction: column;
justify-content: center;
font-size: 22px;
margin: 30px;
`

const CheckoutItem = styled.div`
  margin-bottom: 30px;
  border: 1px solid #F6E4C4;
  padding-left: 30px;
  padding-right: 30px;
  
  h3{
    margin-bottom: 10px;
    font-weight: bold;
  }

  p strong {
    font-weight: bold;
  }
`;

const Details = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;

  strong {
    line-height: 30px;
  }
`

const CartItem = styled.div`
  margin-bottom: 30px;
  line-height: 30px;
`;


const ButtonDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 20px;
margin-top: 50px;
border: 8px;
`

const Back = styled.button`
  background-color: #F6E4C4;
  color: #1F1712;
  height: 53px;
  width: 210px;
  font-size: 19px;
  border-radius: 8px;
`