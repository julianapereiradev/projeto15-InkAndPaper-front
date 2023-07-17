import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import ProductPage from "./pages/ProductPage/ProductPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import MyOrders from "./pages/MyOrders"
import AuthContext from "./contexts/AuthContext"
import PaymentPage from "./pages/PaymentPage"
import { pages } from "./routes/routes"
import { useState } from "react"
import '@ionic/react/css/core.css'
import { setupIonicReact } from '@ionic/react'
import './App.css'

setupIonicReact();


export default function App() {
  const [user, setUser] = useState(0);
  const [cartNumber, setCartNumber] = useState(0);

  return (
    <PagesContainer>
      <AuthContext.Provider value={{ user, setUser, cartNumber, setCartNumber }}>
      <BrowserRouter>
        <Routes>
          <Route path={pages.signIn} element={<SignInPage />} />
          <Route path={pages.signUp} element={<SignUpPage />} />
          <Route path={pages.home} element={<HomePage />} />
          <Route path={pages.product + ':id'} element={<ProductPage />} />
          <Route path={pages.shoppingCart} element={<CartPage />} />
          <Route path={pages.payment} element={<PaymentPage />} />
          <Route path={pages.checkout} element={<CheckoutPage />} />
          <Route path={pages.myorders} element={<MyOrders />} />
        </Routes>
      </BrowserRouter>
      </AuthContext.Provider>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #ffffff;
`
