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
        <LeftBox bgImage={welcomeImage} />

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
                  Entrar com < br /> Google 🚀
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
  height: 100%;
  display: flex;
`

const SignInBox = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LeftBox = styled.div`
  width: 40%;
  height: 100%;
  min-height: 100vh;
  float: left;
  background-image: url(${props => props.bgImage});
  background-size: cover;
`
const RightBox = styled.div`
  width: 60vw;
  height: 100%;
  float: right;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1F1712;
`

const FormBox = styled.div`
  background-color: #1F1712;
  height: 100%;
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
  margin-top: 30px;
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
  padding-left: 10px;
}
`

const BottomBox = styled.div`
  display: flex;
  flex-direction: column;

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