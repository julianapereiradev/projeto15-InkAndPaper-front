import styled from "styled-components"
import Header from "../components/Header"
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import { requisitions, pages } from '../routes/routes';
import { useNavigate } from "react-router-dom";
import { validateUser } from "../constants/functions";
import { ThreeDots } from "react-loader-spinner";

export default function CheckoutPage() {
  const { user, setUser } = useContext(AuthContext);
  const [checkoutItems, setCheckoutItems] = useState(undefined);
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
      const response = await axios.get(requisitions.getCheckout, config);
      setCheckoutItems(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return   <ThreeDots type="ThreeDots" color="#1F1712" height={20} width={50} />
  }

  const goToHomepage = () => {
    navigate(pages.home);
  }

  return (
    <Container>
      <Header />
      <Title>
        <h1>Pedido feito com sucesso!</h1>
        <h2>Confira abaixo o resumo do seu pedido:</h2>
      </Title>
      <Info>
          <CheckoutItem key={checkoutItems._id}>
            
            <Details>
            <h3>Informações Gerais:</h3>
              <p><strong>Data e hora da compra:</strong> {checkoutItems.purchaseDateTime}</p>
              <p><strong>Método de pagamento:</strong> {checkoutItems.paymentData}</p>
              <p><strong>Endereço:</strong> {checkoutItems.addressData} - {checkoutItems.addressComp}</p>
            </Details>
            <h3>Itens do carrinho:</h3>
            {checkoutItems && checkoutItems?.cartItems.map((cartItem) => (
              <CartItem key={cartItem.productId}>
                <p>Título: {cartItem.title}</p>
                <p>Quantidade: {cartItem.quantity}</p>
                <p>Preço total do item: R$ {((cartItem.price) * (cartItem.quantity)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </CartItem>
            ))}
          </CheckoutItem>
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
margin-top: 70px;
margin-bottom: 50px;

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
align-items: center;
font-size: 22px;
border: 1px solid #F6E4C4;
`

const CheckoutItem = styled.div`
  margin-bottom: 30px;
  
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
  margin-bottom: 50px;

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

