import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../components/Header";
import AuthContext from "../contexts/AuthContext";
import { headersAuth, pages, requisitions } from "../routes/routes";
import { IonIcon } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import { useNavigate } from "react-router-dom"
import { validateUser } from "../constants/functions";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [reloaded, setReloaded] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    validateUser(user, setUser);  
    const isValidUser = (user !== 0 && user);

    isValidUser && fetchCartItems();
  }, [reloaded, user]);

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

      const response = await axios.get(requisitions.getUserCart, headersAuth(user.token), config);
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

    return totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
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

  const goToPaymentPage = () => {
    navigate(pages.payment);
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
            <p>Preço unitário: R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <p>Preço total: R$ {Number(item.quantity * item.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </Details>
          <Remove onClick={() => removeItem(item.productId)} title="Retirar do carrinho"><IonIcon icon={trashOutline}/></Remove>
        </CartItem>
      ))}
      <End>
      <Total>Total: R$ {calculateTotalPrice()}</Total>
      <Finish onClick={ ()=> goToPaymentPage() }>Finalizar</Finish>
      </End>
    </CartContainer>
  );
}


const CartContainer = styled.div`
  margin-top: 80px;
  background-color: #1F1712;
  color: #FFFFFF;
`;

const CartItem = styled.div`
  margin-bottom: 20px;
  border: 1px solid  #F6E4C4;
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
  font-size: 50px;
  cursor: pointer;

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