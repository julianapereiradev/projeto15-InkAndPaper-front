import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AuthContext from '../contexts/AuthContext';
import { requisitions, pages } from '../routes/routes';
import { useNavigate } from "react-router-dom"

export default function PaymentPage() {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [addressData, setAddressData] = useState("Insira Seu CEP");
    const navigate = useNavigate();

    useEffect(() => { fetchCartItems(); }, []);
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
    const handleFinishOrder = async () => {
        if (!selectedPayment || !address) {
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
          const response = await axios.post( requisitions.payment,
            { selectedPayment, address }, {headers: { Authorization: `Bearer ${TOKEN}`,}, });
          console.log('Dados de pagamento enviados com sucesso:', response.data);
          navigate(pages.home);
        } catch (error) {
          console.error('Erro ao enviar dados de pagamento:', error);
        }
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

    return (
        <CheckoutContainer>
            <h1>Checkout</h1>

            <SummaryContainer>
                <h2>Resumo do Pedido</h2>
                {cartItems.map((item) => (
                    <CartItem key={item.productId}>
                        <CartItemTitle>{item.title}</CartItemTitle>
                        <CartItemPrice>{item.price}</CartItemPrice>
                    </CartItem>
                ))}
            </SummaryContainer>
            <PaymentContainer>
                <h2>Método de Pagamento</h2>
                <PaymentOption onClick={() => handlePaymentSelection('PIX')} selected={selectedPayment === 'PIX'}>
                    PIX
                </PaymentOption>
                <PaymentOption onClick={() => handlePaymentSelection('Cartão')} selected={selectedPayment === 'Cartão'}>
                    Cartão de Crédito
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
    ) : selectedPayment === 'Cartão' ? (
      <PaymentDataContainer>
        <h2>Pagamento com Cartão de Crédito</h2>
        {/* ... Campos do Formulário do Cartão ... */}
      </PaymentDataContainer>
    ) : null}

            <AddressContainer>
                <h2>Endereço de Entrega</h2>
                <h3>{addressData}</h3>
                <AddressInput
                    type="text"
                    placeholder="Digite seu endereço"
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
            </AddressContainer>

            <ButtonContainer>
                <BackButton>Voltar</BackButton>
                <FinishButton onClick={handleFinishOrder} disabled={isLoading}>
                    {isLoading ? 'Processando...' : 'Finalizar Pedido'}
                </FinishButton>
            </ButtonContainer>
        </CheckoutContainer>
    );
}

const CheckoutContainer = styled.div`
  margin-top: 70px;
  padding: 20px;
`;

const SummaryContainer = styled.div`
  margin-bottom: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CartItemTitle = styled.span`
  flex: 1;
`;

const CartItemPrice = styled.span`
  flex-shrink: 0;
`;

const PaymentContainer = styled.div`
  margin-bottom: 20px;
`;

const PaymentOption = styled.button`
  background-color: ${(props) => (props.selected ? 'lightblue' : 'transparent')};
  padding: 10px;
  margin-right: 10px;
  border: none;
  cursor: pointer;
`;

const AddressContainer = styled.div`
  margin-bottom: 20px;
`;

const AddressInput = styled.input`
  width: 100%;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #ccc;
  border: none;
  cursor: pointer;
`;

const FinishButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.disabled ? '#ccc' : 'lightgreen')};
  border: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const SearchButton = styled.button`
padding: 10px 20px;
background-color: ${(props) => (props.disabled ? '#ccc' : 'lightgreen')};
border: none;
cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
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
