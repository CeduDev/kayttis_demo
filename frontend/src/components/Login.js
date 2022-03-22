import React, { useState } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { login } from '../services/login';
import { timer } from '../utils/timer';

const Login = ({ history, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFail, setLoginFail] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    try {
      await login(data);
      setUser(true);
      history.push('/');
    } catch (e) {
      timer(setLoginFail);
    }
  };

  return (
    <>
      <Row xs="auto" sm="auto">
        <Form className="form">
          <Form.Group
            as={Row}
            className="mb-3"
            style={{ marginTop: 20, textAlign: 'center' }}
          >
            <h2 className="align-self-center">Login</h2>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            onChange={(event) => setUsername(event.target.value)}
          >
            <Col sm={3}>
              <Form.Label>Username</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            onChange={(event) => setPassword(event.target.value)}
          >
            <Col sm={3}>
              <Form.Label>Password</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col xs="auto" sm="auto">
              <Button type="submit" onClick={handleLogin} name="login-button">
                Sign in
              </Button>
            </Col>
            <Col xs="auto" sm="auto">
              <Button
                variant="secondary"
                onClick={() => history.push('/register')}
                name="register-button"
              >
                Register
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Row>
      {loginFail && (
        <Row>
          <Col xs="auto" sm="auto">
            <Alert variant="danger">Invalid username or password!</Alert>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Login;
