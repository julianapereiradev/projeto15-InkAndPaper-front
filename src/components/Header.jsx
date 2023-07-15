import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { headersAuth, pages, requisitions } from "../routes/routes"
import axios from "axios"
import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"
import { cartOutline, logOutOutline } from 'ionicons/icons'
import { IonIcon } from "@ionic/react"
import { googleLogout } from "@react-oauth/google"
import logoheader from "../images/logoheader.png"

export default function Header() {

  const navigate = useNavigate()
  const { user, setUser } = useContext(AuthContext)

  async function logout() {
    try {
      await axios.delete(requisitions.logout, headersAuth(user.token));
    } catch (error) {
      alert(error.response.data.message);
    }

    googleLogout();
    localStorage.removeItem('user');
    setUser(0);
    navigate(pages.signIn)
  }

  return (
    <ContainerHeader>
      <img src={logoheader} alt="Ir para home page" onClick={() => navigate(pages.home)}/>
      <h1 className="font-brit size">Ink & Paper</h1>
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
  height: 70px;
  width: 100%;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #F6E4C4;
  color: #1F1712;

  img {
    height: 90%;
  }

  div {
    * {
      font-size: 45px;
    }
  }

  * {
    cursor: pointer;
  }
`

// const BrandName = styled.h1` 
//   font-family: 'Island Moments', cursive;
//   font-size: 54px;
// `