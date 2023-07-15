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
    
    const newUser = {...formStates};
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
    const newFormStates = {...formStates};
    newFormStates[e.target.id] = e.target.value;
    setFormStates(newFormStates);
  }

  return (
    <SignUpContainer>
    <SignUpBox>
      <LeftBox>
      <img src={welcomeImage} style={{maxHeight: '800px'}} />
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
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

const SignUpBox = styled.div`
width: 1400px;
height: 802px;
border: 1px solid #F6E4C4;
`

const LeftBox = styled.div`
width: 43%;
float: left;
height: 802px;
`
const RightBox = styled.div`
width: 57%;
float: right;
height: 802px;
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
  margin-top: 20px;
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