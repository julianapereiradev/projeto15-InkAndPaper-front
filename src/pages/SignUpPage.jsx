import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import { pages, requisitions } from "../routes/routes";
import { useState } from "react";
import Logo from "../components/Logo";
import welcomeImage from "../images/welcome.jpg"
import { ThreeDots } from "react-loader-spinner";

export default function SignUpPage() {
  const [formStates, setFormStates] = useState({
    name: '',
    email: '',
    password: '',
    checkPassword: ''
  })

  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (formStates.password !== formStates.checkPassword) {
      return alert('Confirmação de senha está incorreta!')
    }

    const newUser = { ...formStates };
    delete newUser.checkPassword;
    setDisable(true);

    axios.post(requisitions.postSignUp, newUser)
      .then(() => {
        navigate(pages.signIn)
        setDisable(false)
      })
      .catch(error => {
        alert(error.response.data)
        setDisable(false)
      })
  }

  function handleChange(e) {
    const newFormStates = { ...formStates };
    newFormStates[e.target.id] = e.target.value;
    setFormStates(newFormStates);
  }

  return (
    <SignUpContainer>
      <SignUpBox>
        <LeftBox bgImage={welcomeImage}>
          {/* <img src={welcomeImage} /> */}
        </LeftBox>

        <RightBox>
          <form onSubmit={e => handleSubmit(e)}>
            <FormBox>

              <TopBox >
                <Logo />
                <div className="font-brit">Cadastro</div>
              </TopBox>

              <InputBox>
                <input
                  id="name"
                  placeholder="Nome"
                  type="text"
                  value={formStates.name}
                  onChange={e => handleChange(e)}
                  autoComplete="name"
                  required
                  disabled={disable}
                />
                <input
                  id="email"
                  placeholder="E-mail"
                  type="email"
                  autoComplete="username"
                  value={formStates.email}
                  onChange={e => handleChange(e)}
                  required
                  disabled={disable}
                />
                <input
                  id="password"
                  placeholder="Senha"
                  type="password"
                  autoComplete="new-password"
                  value={formStates.password}
                  onChange={e => handleChange(e)}
                  required
                  disabled={disable}
                />
                <input
                  id="checkPassword"
                  placeholder="Confirme a senha"
                  type="password"
                  autoComplete="new-password"
                  value={formStates.checkPassword}
                  onChange={e => handleChange(e)}
                  required
                  disabled={disable}
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
                    "Cadastrar"
                  )}
                </button>
                <LinkToSignIn to={pages.signIn}>
                  Já tem uma conta? Entre agora!
                </LinkToSignIn>
              </BottomBox>

            </FormBox>
          </form>
        </RightBox>
      </SignUpBox>
    </SignUpContainer>
  )
}

const SignUpContainer = styled.div`
  background-color: #1F1712;
  width: 100vw;
  height: 100%;
  display: flex;
`

const SignUpBox = styled.div`
  width: 100vw;

`

const LeftBox = styled.div`
  height: 100%;
  display: flex;
  min-height: 100vh;
  width: 40vw;
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
  margin-bottom: 20px;
  width: 250px;
  align-self: center;
  display: flex;
  justify-content: center; 
  align-items: center;
}
`

const LinkToSignIn = styled(Link)`
  align-self: center;
  font-size: 18px;
  color: #F6E4C4;
  text-decoration: underline;
`;