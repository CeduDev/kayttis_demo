import React, { useEffect } from 'react';
import { Tabs, Tab, Row, Container } from 'react-bootstrap';
import Home from './components/Home';
import MyDay from './components/MyDay';
import Routines from './components/Routines';
import { useMainStore } from './stores/MainStore';

const App = () => {
  const store = useMainStore();

  useEffect(() => {
    const startDate = new Date();
    const endDate = new Date();

    let brakes = ['', '', ''];

    startDate.setHours(8, 0);
    endDate.setHours(16, 0);
    store.addRoutine({
      title: 'Monday',
      start: startDate,
      end: endDate,
      breaks: brakes.map((b, idx) => {
        const start = new Date();
        const end = new Date();
        switch (idx) {
          case 0:
            start.setHours(9, 0);
            end.setHours(9, 15);
            return { description: 'Coffee', start: start, end: end };
          case 1:
            start.setHours(11, 30);
            end.setHours(12, 0);
            return { description: 'Lunch', start: start, end: end };
          default:
            start.setHours(14, 0);
            end.setHours(14, 15);
            return { description: 'Walk', start: start, end: end };
        }
      }),
    });
  }, []);
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
