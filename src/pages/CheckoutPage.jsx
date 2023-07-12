import styled from "styled-components"
import Header from "../components/Header"

export default function CheckoutPage() {
  return (
    <CheckoutContainer>
    <Header />
      <h1>Página de Pagamento - Checkout</h1>
    </CheckoutContainer>
  )
}

const CheckoutContainer = styled.div`
  height: 100vh;
`