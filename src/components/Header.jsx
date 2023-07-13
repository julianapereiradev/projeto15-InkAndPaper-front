import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { headersAuth, pages, requisitions } from "../routes/routes"
import axios from "axios"
import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"

export default function Header() {

    const navigate = useNavigate()
    const {user, setUser} = useContext(AuthContext)

    return (
        <ContainerHeader>
        <BrandName onClick={() => navigate(pages.home)}>Ink&Paper</BrandName>
        <button onClick={() => navigate(pages.shoppingCart)}>Carrinho</button>
        <button onClick={async () => {
            try {
              await axios.delete(requisitions.logout, headersAuth(user.token));
            } catch (error) {
              alert(error.response.data.message);
            }

            localStorage.removeItem('token');
            setUser(0);
            navigate(pages.signIn)
          }}>Logout</button>
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