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
      <img src={welcomeImage} style={{maxHeight: '800px'}} />
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

        <LinkToSignUp to={pages.signUp}>
        Primeira vez? Cadastre-se!
      </LinkToSignUp>
      </BottomBox>
      <MyCustomButton onClick={() => login()}>
        Sign in with Google 🚀{' '}
      </MyCustomButton>;

      </FormBox>
      </form>
      </RightBox>
    </SignInBox>
    </SignInContainer>
  )
}

const MyCustomButton = styled.button`
  height: 10vh;
  width: 15vw;
  background-color: red;
  color: white;
`

const SignInContainer = styled.div`
background-color: #1F1712;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

const SignInBox = styled.div`
width: 1400px;
height: 800px;
border: 1px solid #F6E4C4;
`

const LeftBox = styled.div`
width: 43%;
float: left;
height: 800px;
`
const RightBox = styled.div`
width: 57%;
float: right;
height: 800px;
`

const FormBox = styled.div`
background-color: #1F1712;
height: 800px;
display: flex;
flex-direction: column;
justify-content: space-between;
`

const TopBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const InputBox = styled.div`
display: flex;
flex-direction: column;
padding-left: 100px;
padding-right: 100px;

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
margin-bottom: 30px;

button {
  background-color: #F6E4C4;
  border: none;
  border-radius: 8px;
  height: 50px;
  font-size: 22px;
  cursor: pointer;
  margin-bottom: 20px;
  width: 130px;
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
`;