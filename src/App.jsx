import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import ProductPage from "./pages/ProductPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import AuthContext from "./contexts/AuthContext"

export default function App() {
  // const [token, setToken] = useState(localStorage.getItem("token"))
  // const [userName, setUserName] = useState(localStorage.getItem("userName"))

  return (
    <PagesContainer>
      {/* <AuthContext.Provider value={{ token, setToken, userName, setUserName }}> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/produto" element={<ProductPage />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/pagamento" element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
      {/* </AuthContext.Provider> */}
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #ffffff;
`
