import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState, useContext, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { pages, requisitions } from "../routes/routes";
import AuthContext from "../contexts/AuthContext";
import { validateUser } from "../constants/functions";
import { useGoogleLogin } from '@react-oauth/google';

export default function SignInPage() {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    validateUser(user, setUser);
    console.log(user)

    if (user !== 0 && user) {
      navigate(pages.home);
    }
  }, [user])

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);

  function SignIn(e) {
    e.preventDefault();
    setDisable(true);

    const login = { email: email, password: password };

    axios.post(requisitions.postSignIn, login)
      .then((res) => {
        const newUser = {
          name: res.data.username,
          token: res.data.token
        }
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser))
        navigate(pages.home)
        setDisable(false)
      })
      .catch((erro) => {
        alert(erro.response.data);
        setDisable(false)
        alert("erro em: POST no Login:", erro);
      });
  }

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: codeResponse => {
      axios.post(requisitions.postSignInGoogle, {
        code: codeResponse.code
      })
        .then((res) => {
          const newUser = {
            name: res.data.username,
            token: res.data.token
          }
          setUser(newUser);
          localStorage.setItem("user", JSON.stringify(newUser))
          navigate(pages.home)
          setDisable(false)
        })
        .catch((erro) => {
          alert(erro.response.data);
          setDisable(false)
          alert.log("erro em: POST no Login:", erro);
        })
    },
    onError: errorResponse => alert(errorResponse)
  });

  return (
    <SingInContainer>
      <form onSubmit={SignIn}>

        <input
          data-test="email"
          type="email"
          autoComplete="username"
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

      <MyCustomButton onClick={() => login()}>
        Sign in with Google 🚀{' '}
      </MyCustomButton>;

      <Link to={pages.signUp}>
        Primeira vez? Cadastre-se!
      </Link>

    </SingInContainer>

  )
}

const SingInContainer = styled.section`
  height: 85vh;
`
const MyCustomButton = styled.button`
  height: 10vh;
  width: 15vw;
  background-color: red;
  color: white;
`
