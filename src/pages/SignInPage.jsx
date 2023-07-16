import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState, useContext, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { pages, requisitions } from "../routes/routes";
import AuthContext from "../contexts/AuthContext";
import { validateUser } from "../constants/functions";
import { useGoogleLogin } from '@react-oauth/google';
import welcomeImage from "../images/welcome.jpg"
import Logo from "../components/Logo";

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
        // alert("erro em: POST no Login:", erro);
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
    <SignInContainer>
    <SignInBox>
      <LeftBox>
      <img src={welcomeImage} />
      </LeftBox>
      
      <RightBox>
      <form onSubmit={SignIn}>
      <FormBox>

        <TopBox >
        <Logo />
        <div className="font-brit">Login</div>
        </TopBox>
        
        <InputBox>
        <input
          type="email"
          autoComplete="username"
          placeholder="E-mail"
          required
          disabled={disable}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          autoComplete="new-password"
          required
          disabled={disable}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        </InputBox>

        <BottomBox>
        <button
        type="submit" 
        disabled={disable}
        >
          {disable ? (
            <ThreeDots type="ThreeDots" color="#1F1712" height={20} width={50} />
          ) : (
            "Entrar"
          )}
        </button>

      <button onClick={() => login()}>
        Entrar com < br/> Google 🚀
      </button>
        <LinkToSignUp to={pages.signUp}>
        Primeira vez? Cadastre-se!
      </LinkToSignUp>
      </BottomBox>


      </FormBox>
      </form>
      </RightBox>
    </SignInBox>
    </SignInContainer>
  )
}

const SignInContainer = styled.div`
background-color: #1F1712;
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

const SignInBox = styled.div`
width: 100vw;
height: 100vh;
/* border: 1px solid #F6E4C4; */
`

const LeftBox = styled.div`
/* background-color: red; */
width: 40%;
float: left;
/* height: 802px; */

img {
  height: 100vh;
}

`
const RightBox = styled.div`
width: 60%;
float: right;
/* height: 802px; */
/* background-color: green; */
`

const FormBox = styled.div`
background-color: #1F1712;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: space-evenly;
`

const TopBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const InputBox = styled.div`
display: flex;
flex-direction: column;
width: 400px;
align-self: center;

input {
  margin-bottom: 30px;
  height: 50px;
  border: 1px solid #F6E4C4;
  border-radius: 8px;
  background-color: transparent;
  color: #F6E4C4;
  font-size: 16px;
}

input::placeholder {
  color: #F6E4C4;
  font-size: 16px;
  font-style: italic;
}
`

const BottomBox = styled.div`
display: flex;
flex-direction: column;
/* margin-bottom: 30px; */

button {
  background-color: #F6E4C4;
  border: none;
  border-radius: 8px;
  height: 50px;
  font-size: 19px;
  cursor: pointer;
  margin-bottom: 25px;
  width: 250px;
  align-self: center;
  display: flex;
  justify-content: center; 
  align-items: center;
}
`

const LinkToSignUp = styled(Link)`
  align-self: center;
  font-size: 18px;
  color: #F6E4C4;
  text-decoration: underline;
`;