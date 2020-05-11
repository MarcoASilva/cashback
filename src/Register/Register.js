import React, { useState } from 'react';
import logo from '../Common/logo.png';
import './Register.css';
import { Form, Container, Button } from 'react-bootstrap';


function Register() {

  let formData = {}

  let [passwordError, setPasswordError] = useState(false);

  const register = (event) => {
    if(formData.password !== formData.passwordConfirmation) {
      event.preventDefault();
      return setPasswordError(true);
    }
    try {
      var users = JSON.parse(localStorage.getItem('users'));
    } catch (error) {
      localStorage.setItem('users', JSON.stringify([formData]));      
    }
    if (Array.isArray(users)) {
      users.push(formData);
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      localStorage.setItem('users', JSON.stringify([formData]));
    }
  }

  function handleChange(event) {
    formData[event.target.id] = event.target.value;
  }

  return <Form className="Register" onSubmit={register} action="/login">

    <Container className="RegisterLogo">
      <img src={logo} alt="logo" />
    </Container>

    <Form.Group controlId="name">
      <Form.Label>Nome Completo</Form.Label>
      <Form.Control required type="text" placeholder="Insira seu nome completo" value={formData.name} onChange={handleChange} />
    </Form.Group>

    <Form.Group controlId="cpf">
      <Form.Label>CPF</Form.Label>
      <Form.Control required type="text" placeholder="Insira seu CPF" value={formData.cpf} onChange={handleChange} />
    </Form.Group>

    <Form.Group controlId="email">
      <Form.Label>E-Mail</Form.Label>
      <Form.Control required type="email" placeholder="Insira seu email" value={formData.email} onChange={handleChange} />
    </Form.Group>

    <Form.Group controlId="password">
      <Form.Label>Senha de acesso</Form.Label>
      <Form.Control required type="password" placeholder="Insira sua senha" value={formData.password} onChange={handleChange} />
    </Form.Group>

    <Form.Group controlId="passwordConfirmation">
      <Form.Label>Confirmação de senha</Form.Label>
      <Form.Control required type="password" placeholder="Digite novamente sua senha" value={formData.passwordConfirmation} onChange={handleChange} />
      {passwordError? (
        <Form.Text className="text-muted">
        A senha inserida não é igual a confirmação de senha. Por favor, redigite sua senha e sua confirmação de senha.
      </Form.Text>
      ) : ('')}
    </Form.Group>

    <Container className="RegisterFormEnd">

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Aceito os Termos de Uso do O Boticário" />
      </Form.Group>

      <Button variant="success" type="submit">
        Cadastrar
      </Button>

    </Container>

  </Form>

}

export default Register