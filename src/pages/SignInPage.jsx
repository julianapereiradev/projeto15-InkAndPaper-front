import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
// import AuthContext from "../contexts/AuthContext";

export default function SignInPage() {

  const navigate = useNavigate();

  // const {setToken, setUserName} = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);

  function SignIn(e) {
    e.preventDefault();
    setDisable(true);

    const login = { email: email, password: password };

    const promise = axios.post(`https://localhost:5000/sign-in`, login);

    promise.then((res) => {
      // setToken(res.data.token)
      // setUserName(res.data.userName)
      // localStorage.setItem("token", res.data.token)
      // localStorage.setItem("userName", res.data.userName)
      navigate("/home")
      setDisable(false)

      console.log("resposta.data em: POST no Login:", res.data);
    });

    promise.catch((erro) => {
      alert(erro.response.data);
      setDisable(false)
      console.log("erro em: POST no Login:", erro);
    });
  }

  return (
    <SingInContainer>
      <form onSubmit={SignIn}>

        <input
          data-test="email"
          type="email"
          placeholder="E-mail"
          required
          disabled={disable}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          data-test="password"
          type="password"
          placeholder="Senha"
          autoComplete="new-password"
          required
          disabled={disable}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
        data-test="sign-in-submit" 
        type="submit" 
        disabled={disable}
        >
          {disable ? (
            <ThreeDots type="ThreeDots" color="#fff" height={20} width={50} />
          ) : (
            "Entrar"
          )}
        </button>
      </form>

      <Link to={`/cadastro`}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
`
