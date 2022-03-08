import React, { useEffect, useState } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import Notification from 'react-web-notification';
import Emoji from './Emoji';

const Home = () => {
  const [ignore, setIgnore] = useState(false);
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState({});
  const [buttonClicked, setButtonClicked] = useState(0);
  const [todaysDay, setTodaysDay] = useState('Monday');

  useEffect(() => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    setTodaysDay(days[new Date().getDay()]);
  }, []);

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
    setIgnore(false);
  };
  const handlePermissionDenied = () => {
    setIgnore(true);
  };
  const handleNotSupported = () => {
    setIgnore(true);
  };

  return (
    <Container>
      <Row>
        <h2>
          Welcome! <Emoji symbol="👋" label="hand_wave" />
        </h2>
      </Row>
      <Row>
        <p>
          Continuous logins: <strong>10 days</strong>, which is longer than 60%
          of the average user <Emoji symbol="💪" label="strong" />
        </p>
      </Row>
      <Row>
        <p>
          Today it's a sunny {todaysDay}, maybe try out this cool{' '}
          <a
            href="https://www.themuse.com/advice/work-from-home-productivity-schedule"
            target="_blank"
            rel="noreferrer"
          >
            new routine?
          </a>
        </p>
      </Row>
      <Row>
        <Col>
          <Button onClick={handleButtonClick}>Test Notifications</Button>
          <Notification
            ignore={ignore}
            title={title}
            options={options}
            notSupported={handleNotSupported}
            onPermissionGranted={handlePermissionGranted}
            onPermissionDenied={handlePermissionDenied}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
