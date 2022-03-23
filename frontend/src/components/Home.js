import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Button,
  Col,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import Notification from 'react-web-notification';
import Emoji from './Emoji';
import Stats from './Stats';

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
        <Col>
          <Row>
            <h2>
              Welcome! <Emoji symbol="👋" label="hand_wave" />
            </h2>
          </Row>
          <Row>
            <p>
              Continuous logins: <strong>10 days</strong>, which is more than
              60% of users in your team <Emoji symbol="💪" label="strong" />.
            </p>
          </Row>
          <Row>
            <p>
              Today it's a <Emoji symbol="☀️" label="sun" /> {todaysDay}, maybe
              try out this cool{' '}
              <a
                href="https://www.themuse.com/advice/work-from-home-productivity-schedule"
                target="_blank"
                rel="noreferrer"
              >
                new routine?
              </a>
            </p>
          </Row>
          <Row className="test-notification-row mb-1">
            <Col className="test-notification-col">
              <Button
                onClick={handleButtonClick}
                className="test-notification-button"
              >
                Test Notifications
              </Button>
              <Notification
                ignore={ignore}
                title={title}
                options={options}
                notSupported={handleNotSupported}
                onPermissionGranted={handlePermissionGranted}
                onPermissionDenied={handlePermissionDenied}
              />
            </Col>
            <Col className="ps-0">
              <OverlayTrigger
                placement="bottom"
                overlay={(props) => (
                  <Tooltip {...props}>
                    <span className="tool-tip-info">
                      If notifications aren’t working, make sure that you have
                      allowed them in your computer settings
                    </span>
                  </Tooltip>
                )}
              >
                <Button variant="outline-success" className="tool-tip">
                  ?
                </Button>
              </OverlayTrigger>
            </Col>
          </Row>
        </Col>
        <Col>
          <Stats />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
