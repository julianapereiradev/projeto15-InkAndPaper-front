import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { pages } from "../routes/routes"

export default function Header() {

    const navigate = useNavigate()

    return (
        <ContainerHeader>
        <BrandName onClick={() => navigate(pages.home)}>Ink&Paper</BrandName>
        <button onClick={() => navigate(pages.shoppingCart)}>Carrinho</button>
        <button onClick={() => navigate(pages.signIn)}>Logout</button>
        </ContainerHeader>
    )
}

const ContainerHeader = styled.div` 
    border: 1px solid black;
    display: flex;
    justify-content: space-around;
`

const BrandName = styled.h1` 
cursor: pointer;
`