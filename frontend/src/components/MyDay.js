import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';

const MyDay = () => {
  return (
    <Container>
      <Row>Use existing routine</Row>
      <Row>Insert routine myself</Row>
      <Row></Row>
      <Row>
        <Button onClick={() => console.log('start day')}>Start My Day</Button>
      </Row>
    </Container>
  );
};

export default MyDay;
