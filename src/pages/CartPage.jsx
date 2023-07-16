import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../components/Header";
import AuthContext from "../contexts/AuthContext";
import { headersAuth, pages, requisitions } from "../routes/routes";
import { IonIcon } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [reloaded, setReloaded] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchCartItems();
  }, [reloaded]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload); 
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
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

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    return totalPrice.toFixed(2);
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(requisitions.removeItems, {
        data: {
          productId: productId,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setReloaded(!reloaded); 
    } catch (error) {
      alert(error.message);
    }
  };

  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = ''; 
  };

  return (
    <CartContainer>
      <Header />
      <h1>Página de Carrinho</h1>
      {cartItems.map((item) => (
        <CartItem key={item.productId}>
          <CartImage src={item.image} alt={item.title}></CartImage>
          <Details>          
            <h3>{item.title}</h3>
            <p>Quantidade: {item.quantity}</p>
            <p>Preço unitário: {item.price}</p>
            <p>Preço total: {item.quantity * item.price}</p>
          </Details>
          <Remove onClick={() => removeItem(item.productId)}><IonIcon icon={trashOutline}/></Remove>
        </CartItem>
      ))}
      <Total>Total: R$ {calculateTotalPrice()}</Total>
      <Finish>Finalizar compra</Finish>
    </CartContainer>
  );
}


const CartContainer = styled.div`
  height: 100vh;
  margin-top: 70px;
  background-color: #1F1712;
  color: white;
`;

const CartItem = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CartImage = styled.img`
  height: 100px;
  width: 100px;
`
const Details = styled.div`
`

const Total = styled.div`

`
const Remove = styled.div`
  margin-right: 10px;

`
const Finish = styled.button`

`