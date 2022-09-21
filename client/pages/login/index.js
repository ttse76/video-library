import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import PageWrapper from 'components/document/PageWrapper';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    await signIn('credentials',{
      username,
      password,
      callbackUrl: '/'
    })
  };

  return (
    <PageWrapper title="Login">
      <Row>
        <Col>
        <Form onSubmit={onSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="loginUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="pt-3">
            <Col lg={4}>
              <Button type="submit">Login</Button>
            </Col>
          </Row>
          <Row>
            <Col>
            </Col>
          </Row>
        </Form>
        </Col>
      </Row>
    </PageWrapper>
  );
}