import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { headersAuth, pages, requisitions } from "../routes/routes"
import axios from "axios"
import { useContext, useEffect } from "react"
import AuthContext from "../contexts/AuthContext"
import { cartOutline, clipboard, logOutOutline } from 'ionicons/icons'
import { IonIcon } from "@ionic/react"
import { googleLogout } from "@react-oauth/google"
import logoheader from "../images/logoheader.png"
import Logo from "./Logo"

export default function Header() {

  const navigate = useNavigate()
  const { user, setUser, cartNumber, setCartNumber } = useContext(AuthContext)

  useEffect(() => {
    axios.get(requisitions.getUserCart, headersAuth(user.token))
      .then(res => {
        let quantity = 0;
        res.data.forEach(item => quantity = quantity + item.quantity)
        setCartNumber(quantity)
      })
      .catch(error => alert(error.data))
  })

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
      <h1 className="font-brit size" onClick={() => navigate(pages.home)}>Ink & Paper</h1>
      <div>
        <IconNumberCart style={{fontSize: '20px'}}>{cartNumber}</IconNumberCart>
        <IonIcon icon={clipboard} onClick={() => navigate(pages.myorders)}></IonIcon>
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

const IconNumberCart = styled.div`
  background-color: #1F1712;;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #F6E4C4;
  font-weight: bold;
  position: absolute;
  top: 0;
  right: 90px;
  z-index: 1;
`