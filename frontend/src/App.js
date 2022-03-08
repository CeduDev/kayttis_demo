import React from 'react';
import { Tabs, Tab, Row, Container } from 'react-bootstrap';
import Home from './components/Home';
import MyDay from './components/MyDay';
import Routines from './components/Routines';

const App = () => {
  return (
    <Container>
      <Row>
        <h1>Habit House</h1>
      </Row>
      <Row>
        <Tabs defaultActiveKey="home" id="kakka" className="mb-3">
          <Tab eventKey="home" title="Home">
            <Home />
          </Tab>
          <Tab eventKey="myDay" title="My Day">
            <MyDay />
          </Tab>
          <Tab eventKey="routines" title="Routines">
            <Routines />
          </Tab>
          <Tab eventKey="stats" title="Stats">
            <div>stats</div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
};

export default App;
