import styled from "styled-components"
import Header from "../components/Header"

export default function ProductPage() {
  return (
    <ProductContainer>
    <Header />
      <h1>Página do Produto</h1>
    </ProductContainer>
  )
}

const ProductContainer = styled.div`
  height: 100vh;
`