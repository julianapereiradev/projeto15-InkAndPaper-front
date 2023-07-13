import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import { pages, requisitions } from "../routes/routes";
import { useState } from "react";
import Logo from "../components/Logo";

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
      <form onSubmit={e => handleSubmit(e)}>
        <Logo />
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
        <button type="submit" data-test="sign-up-submit">Cadastrar</button>
      </form>

      <Link to={pages.signIn}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
