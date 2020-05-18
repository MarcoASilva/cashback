import React, { useState } from 'react';
import logo from '../Common/logo.png';
import './Login.css';
import { Form, Container, Button, Nav } from 'react-bootstrap';


function Login() {

  const [error, setError] = useState(false);
  const formData = {};

  function handleChange(event) {
    formData[event.target.id] = event.target.value;
  }

  const login = (event) => {

    const { email, password } = formData;

    try {

      var users = JSON.parse(localStorage.getItem('users'));

    } catch (error) {

      event.preventDefault();
      document.getElementById("LoginForm").reset();

    }

    if (Array.isArray(users)) {

      const user = users.find(user => user.email === email && user.password === password);

      if (!user) {
        event.preventDefault();
        document.getElementById("LoginForm").reset();
        setError(true);
      }

      sessionStorage.setItem('loggedUser', JSON.stringify(user));

    } else {

      event.preventDefault();
      document.getElementById("LoginForm").reset();
      setError(true);

    }
  }

  return <Form className="Login" id="LoginForm" onSubmit={login} action="/orders">

    <Container className="LoginLogo">
      <img src={logo} alt="logo" />
    </Container>

    <Form.Group controlId="email">
      <Form.Control required type="email" placeholder="Digite seu email cadastrado" value={formData.email} onChange={handleChange} />
    </Form.Group>

    <Form.Group controlId="password">
      <Form.Control required type="password" placeholder="Digite sua senha" value={formData.password} onChange={handleChange} />
    </Form.Group>

    {error ? (
      <Form.Text className="text-muted">
        Senha e/ou email incorreto(s).
      </Form.Text>
    ) : ('')}

    <Container className="LoginFormEnd">

      <Button variant="success" type="submit">
        Entrar
      </Button>

    </Container>

    <Container className="register">
      <Nav.Link href="/register">Não é cadastrado? Cadastre-se</Nav.Link>
    </Container>

  </Form>

}

export default Login