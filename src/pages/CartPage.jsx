import styled from "styled-components"
import Header from "../components/Header"

export default function CartPage() {
  return (
    <CartContainer>
    <Header />
      <h1>Página de Carrinho</h1>
    </CartContainer>
  )
}

const CartContainer = styled.div`
  height: 100vh;
`