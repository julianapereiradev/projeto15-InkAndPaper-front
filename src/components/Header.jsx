import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { headersAuth, pages, requisitions } from "../routes/routes"
import axios from "axios"
import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"
import { cartOutline, logOutOutline } from 'ionicons/icons'
import { IonIcon } from "@ionic/react"
import homeImg from "../assets/home.png"

export default function Header() {

  const navigate = useNavigate()
  const { user, setUser } = useContext(AuthContext)

  async function logout() {
    try {
      await axios.delete(requisitions.logout, headersAuth(user.token));
    } catch (error) {
      alert(error.response.data.message);
    }

    localStorage.removeItem('token');
    setUser(0);
    navigate(pages.signIn)
  }

  return (
    <ContainerHeader>
      <img src={homeImg} alt="Ir para home page" onClick={() => navigate(pages.home)}/>
      <BrandName onClick={() => navigate(pages.home)}>Ink & Paper</BrandName>
      <div>
        <IonIcon icon={cartOutline} onClick={() => navigate(pages.shoppingCart)}></IonIcon>
        <IonIcon icon={logOutOutline} onClick={() => logout()}></IonIcon>
      </div>
    </ContainerHeader>
  )
}

const ContainerHeader = styled.header` 
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  height: 15vh;
  width: 100vw;
  border: 1px solid black;
  filter: drop-shadow(3px 3px 7px black);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  background-color: #F6E4C4;

  img {
    height: 68%;
  }

  div {
    * {
      font-size: 59px;
    }
  }

  * {
    cursor: pointer;
  }
`

const BrandName = styled.h1` 
  font-family: 'Island Moments', cursive;
  font-size: 54px;
`