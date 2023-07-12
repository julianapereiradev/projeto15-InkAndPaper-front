import styled from "styled-components"
import Header from "../components/Header"

export default function HomePage() {
  return (
    <HomeContainer>
    <Header />
      <h1>Página de HomePage</h1>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  height: 100vh;
`