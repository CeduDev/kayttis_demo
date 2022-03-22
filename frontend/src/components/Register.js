import React, { useState } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { register } from '../services/register';
import { timer } from '../utils/timer';

const Register = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerFailed, setRegisterFailed] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    try {
      await register(data);
      history.push('/login');
    } catch (e) {
      timer(setRegisterFailed);
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
            <h2 className="align-self-center">Register</h2>
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
              <Button
                type="submit"
                onClick={handleRegister}
                name="register-button"
              >
                Register
              </Button>
            </Col>
            <Col xs="auto" sm="auto">
              <Button
                variant="secondary"
                onClick={() => history.push('/login')}
                name="register-button"
              >
                Login
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Row>
      {registerFailed && (
        <Row>
          <Col xs="auto" sm="auto">
            <Alert variant="danger">
              Registration failed, please try again!
            </Alert>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Register;
