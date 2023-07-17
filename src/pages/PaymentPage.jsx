import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AuthContext from '../contexts/AuthContext';
import { requisitions, pages } from '../routes/routes';
import { useNavigate } from "react-router-dom"
import { validateUser } from '../constants/functions';
import Header from '../components/Header';
import { ThreeDots } from "react-loader-spinner";



export default function PaymentPage() {
    const { user, setUser } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [address, setAddress] = useState('');
    const [addressComp, setAddressComp] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [addressData, setAddressData] = useState("Insira Seu CEP");
    const navigate = useNavigate();

    useEffect(() => { 
        validateUser(user, setUser);
        fetchCartItems(); }, [user]);
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
            console.error('Erro ao obter os itens do carrinho:', error);
        }
    };
    const handlePaymentSelection = (paymentMethod) => {
        setSelectedPayment(paymentMethod);
    };
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const handleAddressCompChange = (event) => {
        setAddressComp(event.target.value);
    };
    const handleFinishOrder = async () => {
        if (!selectedPayment || !address || !addressComp) {
            alert('Selecione o método de pagamento e preencha o endereço');
            return;
        }

        setIsLoading(true);
        try {
            await postPaymentData();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Erro ao finalizar a compra:', error);
        }
    };

    const postPaymentData = async () => {
        const TOKEN = user.token;
        try {
            const response = await axios.post(requisitions.payment,
                { paymentData: selectedPayment, address, addressComp }, { headers: { Authorization: `Bearer ${TOKEN}`, }, });
            console.log('Dados de pagamento enviados com sucesso:', response.data);
            navigate(pages.checkout);
        } catch (error) {
            console.error('Erro ao enviar dados de pagamento:', error);
        }
    };
    const calculateTotalPrice = () => {
        const totalPrice = cartItems.reduce((total, item) => {
          return total + item.quantity * item.price;
        }, 0);
    
        return totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    };
    const fetchAddressByCep = async (cep) => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const data = response.data;
            const ad = `${data.logradouro}, ${data.localidade}`;
            setAddressData(ad)
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
        }
    };

    const returnPayment = async () => {
        navigate(pages.shoppingCart);
    }

    return (
        <CheckoutContainer>
            <Header/>
            <SummaryContainer>
                <h2>Resumo do Pedido</h2>
                {cartItems.map((item) => (
                    <CartItem key={item.productId}>
                        <CartItemTitle>{item.title}</CartItemTitle>
                        <CartItemQuantity> Quantidade: {item.quantity}</CartItemQuantity>
                        <CartItemPrice> Preço: R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</CartItemPrice>
                    </CartItem>
                ))}
                <Total>Total: R$ {calculateTotalPrice()}</Total>
            </SummaryContainer>
            <PaymentContainer>
                <h2>Método de Pagamento</h2>
                <PaymentOption onClick={() => handlePaymentSelection('PIX')} selected={selectedPayment === 'PIX'}>
                    PIX
                </PaymentOption>
                <PaymentOption onClick={() => handlePaymentSelection('Boleto')} selected={selectedPayment === 'Boleto'}>
                    Boleto Bancário
                </PaymentOption>
            </PaymentContainer>
            {selectedPayment === 'PIX' ? (
                <PaymentDataContainer>
                    <h2>Pagamento via PIX</h2>
                    <p>Número PIX: 0123456789 </p>
                </PaymentDataContainer>
            ) : selectedPayment === 'Boleto' ? (
                <PaymentDataContainer>
                    <h2>Pagamento via Boleto Bancário</h2>
                    <p>Número do Boleto: 0123456789</p>
                </PaymentDataContainer>
            ) : null}

            <AddressContainer>
                <h2>Endereço de Entrega</h2>
                <h3>• <strong>Endereço encontrado:</strong> {addressData}</h3>
                <AddressInput
                    type="number"
                    placeholder="Digite seu CEP"
                    value={address}
                    onChange={handleAddressChange}
                    onBlur={async () => {
                        if (address.length === 8) {
                            await fetchAddressByCep(address);
                        }
                    }}
                />
                <SearchButton onClick={() => {
                    if (address.length === 8) {
                        fetchAddressByCep(address);
                    }
                }}>Buscar CEP</SearchButton>



                <Address 
                    type="text"
                    placeholder="Complemento"
                    value={addressComp}
                    onChange={handleAddressCompChange}>

                </Address>

            </AddressContainer>

            <ButtonContainer>
                <BackButton onClick={returnPayment}>Voltar</BackButton>
                <FinishButton onClick={handleFinishOrder} disabled={isLoading}>
                    {isLoading ? (<ThreeDots type="ThreeDots" color="#1F1712" height={10} width={50} />) : 'Finalizar Pedido'}
                </FinishButton>
            </ButtonContainer>
        </CheckoutContainer>
    );
}

const CheckoutContainer = styled.div`
  margin-top: 70px;
  padding: 20px;
  background-color: #1F1712;
  color: #ffffff;
  font-size: 20px;
`;
const Address = styled.input`
    width: 100%;
    padding: 10px;
    background-color:#1F1712;
  border: 1px solid #F6E4C4;
  border-radius: 5px;
  color: #ffffff;
  font-size: 18px;
`
const SummaryContainer = styled.div`
  margin-bottom: 20px;
  h2{
    color: #F6E4C4;
    font-size: 30px;
    margin-bottom: 10px;
  }
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 10px;
  border: 1px solid #F6E4C4;

`;

const CartItemTitle = styled.span`
  flex: 1;
  padding: 10px;
`;

const CartItemPrice = styled.span`
  flex-shrink: 0;
  padding: 10px;

`;

const CartItemQuantity = styled.span`
  padding: 10px;
    
`;

const PaymentContainer = styled.div`
  margin-bottom: 20px;
  h2{
    font-size:30px;
    margin-bottom: 10px;
  }
`;

const PaymentOption = styled.button`
  background-color: ${(props) => (props.selected ? '#F6E4C4' : 'transparent')};
  padding: 10px;
  margin-right: 10px;
  border: none;
  cursor: pointer;
  border: 1px solid #F6E4C4;
  color: ${(props) => (props.selected ? '#1F1712' : '#F6E4C4')};
`;

const AddressContainer = styled.div`
  margin-bottom: 20px;

  h2{
    font-size: 30px;
    margin-bottom: 10px;
  }
  h3 {
    margin-top: 10px;
    margin-bottom: 30px;
  } 

  strong {
    font-weight: bold;
  }
`;

const AddressInput = styled.input`
  width: 100%;
  padding: 10px;
  height: 50px;
  margin-bottom: 10px;
  background-color:#1F1712;
  border: 1px solid #F6E4C4;
  border-radius: 5px;
  color: #ffffff;
  font-size: 18px;

  input::placeholder {
  color: #F6E4C4;
  font-size: 16px;
  padding-left: 10px;
}
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 50px;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #F6E4C4;
  color: #1F1712;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 30px;
  font-size: 20px;
`;

const FinishButton = styled.button`
  padding: 10px 20px;
  font-size: 20px;
  background-color: #F6E4C4;
  border: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border-radius: 5px;
`;

const SearchButton = styled.button`
padding: 10px 20px;
font-size: 18px;
background-color: ${(props) => (props.disabled ? '#1F1712' : '#F6E4C4')};
border: none;
cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
margin-bottom: 10px;
border-radius: 5px;
`;

const PaymentDataContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 20px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 5px;
  }
`;

const Total = styled.div`
border: 1px solid #F6E4C4;
padding: 10px;


`