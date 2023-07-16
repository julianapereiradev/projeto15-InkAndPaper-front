import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../components/Header";
import AuthContext from "../contexts/AuthContext";
import { requisitions } from "../routes/routes";
import { IonIcon } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.get(requisitions.getUserCart, config);
      const data = response.data;
      setCartItems(data);
    } catch (error) {
      console.error("Erro ao obter os itens do carrinho:", error);
    }
  };

  if(cartItems === undefined) {
    return (
    <h1>Ta carregando</h1>
    )
  }

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => {
      return total + (item.quantity*item.price);
    }, 0);

    return totalPrice.toFixed(2);
  };

  return (
    <CartContainer>
      <Header />
      {cartItems.map((item) => (
        <CartItem key={item.productId}>
          <CartImage src={item.image} alt={item.title}></CartImage>
          <Details>          
            <h3>{item.title}</h3>
            <p>Quantidade: {item.quantity}</p>
            <p>Preço unitário: {item.price}</p>
            <p>Preço total: {item.quantity * item.price}</p>
          </Details>
          <Remove><IonIcon icon={trashOutline} /></Remove>
        </CartItem>
      ))}
      <End>
      <Total>Total: R$ {calculateTotalPrice()}</Total>
      <Finish>Finalizar</Finish>
      </End>
    </CartContainer>
  );
}

const CartContainer = styled.div`
  margin-top: 80px;
  background-color: #1F1712;
  color: #F6E4C4;
`;

const CartItem = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CartImage = styled.img`
  width: 120px;
`
const Details = styled.div`
width: 100%;
text-align: center;
font-size: 20px;
line-height: 170%;

h3 {
  font-weight: bold;
}
`
const End = styled.div`
font-size: 25px;
display: flex;
flex-direction: column;
align-items: flex-end;
margin-right: 25px;
`

const Total = styled.div`
margin-bottom: 20px;
font-weight: bold;

`
const Remove = styled.div`
  margin-right: 10px;

`
const Finish = styled.button`
  color: #1F1712;
  background-color: #F6E4C4;
  border: none;
  border-radius: 5px;
  height: 40px;
  font-size: 25px;
  cursor: pointer;
`