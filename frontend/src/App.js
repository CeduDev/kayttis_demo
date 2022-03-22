import React, { useEffect, useState } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';
import { Tabs, Tab, Row, Container, Button } from 'react-bootstrap';
import Home from './components/Home';
import MyDay from './components/MyDay';
import Routines from './components/Routines';
import Login from './components/Login';
import Register from './components/Register';
import { useMainStore } from './stores/MainStore';
import { checkAuth } from './services/checkAuth';
import { logout } from './services/logout';

const App = () => {
  const store = useMainStore();
  const history = useHistory();
  const [user, setUser] = useState(false);

  useEffect(() => {
    const getAuth = async () => {
      try {
        await checkAuth();
      } catch (e) {
        history.push('/login');
      }
    };

    getAuth();
  }, [history, user]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(false);
    } catch (e) {
      console.log('täh? not possible');
    }
  };

  return (
    <Container>
      <Row>
        <h1>
          Habit House {user && <Button onClick={handleLogout}>Logout</Button>}
        </h1>
      </Row>
      <Switch>
        <Route exact path="/login">
          <Login history={history} setUser={setUser} />
        </Route>
        <Route exact path="/register">
          <Register history={history} />
        </Route>
        <Route exact path="/">
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
            </Tabs>
          </Row>
        </Route>
        <Route>
          <div className="flex top-level-component">
            <h2 className="align-self-center text-align-center">
              Error 404: Page not found
            </h2>
          </div>
        </Route>
      </Switch>
    </Container>
  );
};

export default App;
