import styled from "styled-components"
import Header from "../components/Header"
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import { requisitions, pages } from '../routes/routes';
import { validateUser } from '../constants/functions';
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { user, setUser } = useContext(AuthContext);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

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
        {checkoutItems.map((item) => (
          <CheckoutItem key={item._id}>
            <Details>
              <h2><strong>ID do pedido:</strong> {item._id}</h2>
              <p>Data e hora da compra: {item.purchaseDateTime}</p>
              <p>Método de pagamento: {item.paymentData}</p>
              <p>Endereço: {item.address} - {item.addressComp}</p>
            </Details>
            <h3>Itens do carrinho:</h3>
            {item.cartItems.map((cartItem) => (
              <CartItem key={cartItem.productId}>
                <p>Título: {cartItem.title}</p>
                <p>Quantidade: {cartItem.quantity}</p>
                <p>Preço total do item: {((cartItem.price) * (cartItem.quantity)).toFixed(2)}</p>
              </CartItem>
            ))}
          </CheckoutItem>
        ))}
      </Info>
      <ButtonDiv>
        <Back onClick={goToHomepage}>Voltar à loja</Back>
      </ButtonDiv>
    </Container>
  );
};

const Back = styled.button`
  background-color: #F6E4C4;
  color: #1F1712;
  height: 53px;
  width: 210px;
  font-size: 19px;
  border-radius: 8px;
`
const Container = styled.div`
  background-color: #1F1712;
  font-family: 'Inika';
  `;

const CheckoutItem = styled.div`
  margin-bottom: 30px;
  color: #F6E4C4;
  h3{
    margin-bottom: 10px;
  }
`;

const CartItem = styled.div`
  margin-bottom: 10px;
`;

const Title = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 20px;
  margin-top: 70px;
  color: #F6E4C4;
  h1{
    font-size: 48px;
  }
  h2{
    font-size: 24px;
  }
`
const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  margin-top: 100px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: red;
  margin-top: 100px;
`;

const Details = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
`
const ButtonDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 20px;
margin-top: 50px;
border: 8px;

`
const Info = styled.div`
font-size: 20px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`