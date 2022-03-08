import React, { useState } from 'react';
import { Button, Tabs, Tab, Row, Container } from 'react-bootstrap';
import Notification from 'react-web-notification';

const App = () => {
  const [ignore, setIgnore] = useState(false);
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState({});

  const handleButtonClick = () => {
    if (ignore) {
      return;
    }
    setTitle('Test');
    setOptions({
      tag: Date.now(),
      body: `Test: ${Date.now()}`,
      lang: 'eng',
      dir: 'ltr',
    });
  };

  const handlePermissionGranted = () => {
    console.log('Permission Granted');
    setIgnore(false);
  };
  const handlePermissionDenied = () => {
    console.log('Permission Denied');
    setIgnore(true);
  };
  const handleNotSupported = () => {
    console.log('Web Notification not Supported');
    setIgnore(true);
  };

  return (
    <Container>
      <Row>
        <h1>Habit House</h1>
      </Row>
      <Row>
        <Tabs defaultActiveKey="home" id="kakka" className="mb-3">
          <Tab eventKey="home" title="Home">
            <div>home</div>
            <Button onClick={handleButtonClick}>test</Button>
          </Tab>
          <Tab eventKey="myDay" title="My Day">
            <div>my day</div>
          </Tab>
          <Tab eventKey="routines" title="Routines">
            <div>routines</div>
          </Tab>
          <Tab eventKey="stats" title="Stats">
            <div>stats</div>
          </Tab>
        </Tabs>
      </Row>
      <Row>
        <Notification
          ignore={ignore}
          title={title}
          options={options}
          notSupported={handleNotSupported}
          onPermissionGranted={handlePermissionGranted}
          onPermissionDenied={handlePermissionDenied}
        />
      </Row>
    </Container>
  );
};

export default App;
