import React, { useState } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import Notification from 'react-web-notification';

const Home = () => {
  const [ignore, setIgnore] = useState(false);
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState({});
  const [buttonClicked, setButtonClicked] = useState(0);

  const handleButtonClick = () => {
    if (ignore) {
      return;
    }

    if (buttonClicked === 0) {
      setTitle('Breaktime 💃');
      setOptions({
        tag: Date.now(),
        body: `Time for your break!`,
        lang: 'eng',
        dir: 'ltr',
      });
      setButtonClicked(1);
    } else {
      setTitle('Back to work 👔');
      setOptions({
        tag: Date.now(),
        body: `Break is over, continue working!`,
        lang: 'eng',
        dir: 'ltr',
      });
      setButtonClicked(0);
    }
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
        <h2>Welcome!</h2>
      </Row>
      <Row>
        <Button onClick={handleButtonClick}>Test Notifications</Button>
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

export default Home;
