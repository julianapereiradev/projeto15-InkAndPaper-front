import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import { pages, requisitions } from "../routes/routes";
import { useState } from "react";
import Logo from "../components/Logo";
import welcomeImage from "../images/welcome.jpg"

export default function SignUpPage() {
  const [formStates, setFormStates] = useState({
    name: '',
    email: '',
    password: '',
    checkPassword: ''
  })

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (formStates.password !== formStates.checkPassword) {
      return alert('Confirmação de senha está incorreta!')
    }

    const newUser = {...formStates};
    delete newUser.checkPassword;

    axios.post(requisitions.postSignUp, newUser)
      .then(() => navigate(pages.signIn))
      .catch(error => alert(error.response.data))
  }

  function handleChange(e) {
    const newFormStates = {...formStates};
    newFormStates[e.target.id] = e.target.value;
    setFormStates(newFormStates);
  }

  return (
    <SingUpContainer>
    <SingUpBox>
      <LeftBox>
      <img src={welcomeImage} style={{maxHeight: '800px'}} />
      </LeftBox>
      
      <RightBox>
      <form onSubmit={e => handleSubmit(e)}>
      <FormBox>

        <TopBox >
        <Logo />
        <Title>Cadastro</Title>
        </TopBox>
        
        <InputBox>
        <input
          id="name"
          placeholder="Nome" 
          type="text" 
          value={formStates.name}
          onChange={e => handleChange(e)}
          autoComplete="name"
        />
        <input
          id="email"
          placeholder="E-mail" 
          type="email"
          autoComplete="username"
          value={formStates.email}
          onChange={e => handleChange(e)}
        />
        <input
          id="password"
          placeholder="Senha" 
          type="password" 
          autoComplete="new-password" 
          value={formStates.password}
          onChange={e => handleChange(e)}
        />
        <input 
          id="checkPassword"
          placeholder="Confirme a senha" 
          type="password" 
          autoComplete="new-password" 
          value={formStates.checkPassword}
          onChange={e => handleChange(e)}
        />
        </InputBox>

        <BottomBox>
        <button type="submit">Cadastrar</button>
        <LinkToSignIn to={pages.signIn}>
        Já tem uma conta? Entre agora!
      </LinkToSignIn>
      </BottomBox>

      </FormBox>
      </form>
      </RightBox>
    </SingUpBox>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.div`
background-color: #1F1712;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

const SingUpBox = styled.div`
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
margin-top: 50px;
`

const Title = styled.h1`
font-family: 'Island Moments', cursive;
color: #F6E4C4;
font-size: 80px;
`

const InputBox = styled.div`
display: flex;
flex-direction: column;
padding-left: 100px;
padding-right: 100px;

input {
  margin: 20px;
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
margin-bottom: 50px;

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
}
`

const LinkToSignIn = styled(Link)`
  align-self: center;
  font-size: 18px;
  color: #F6E4C4;
`;