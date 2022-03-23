import React, { useEffect, useState } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';
import { Tabs, Tab, Row, Container, Button } from 'react-bootstrap';
import Home from './components/Home';
import Routines from './components/Routines';
import Login from './components/Login';
import Register from './components/Register';
import { useMainStore } from './stores/MainStore';
import { checkAuth } from './services/checkAuth';
import { logout } from './services/logout';
import { useInterval } from './utils/timer';
import { observer } from 'mobx-react-lite';
import Notification from 'react-web-notification';
import { getRoutines } from './services/getRoutines';
import { parseISOString } from './utils/dates';

const App = observer(() => {
  const store = useMainStore();
  const history = useHistory();
  const [user, setUser] = useState(false);
  const [showView, setShowView] = useState(0);
  const [activeBreak, setActiveBreak] = useState(null);

  const [ignore, setIgnore] = useState(false);
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState({});

  const handlePermissionGranted = () => {
    setIgnore(false);
  };
  const handlePermissionDenied = () => {
    setIgnore(true);
  };
  const handleNotSupported = () => {
    setIgnore(true);
  };

  useEffect(() => {
    setShowView(0);
    const getAuth = async () => {
      try {
        await checkAuth();
        setUser(true);
      } catch (e) {
        history.push('/login');
      }
      setShowView(1);
    };

    getAuth();
  }, [history, user]);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(false);
    } catch (e) {
      console.log('täh? not possible');
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getRoutines();
        await store.deleteAllRoutines();

        res.data.forEach(async (ro) => {
          const r = JSON.parse(ro.json_string);
          let resBreaks = [];
          for await (const b of r.breaks) {
            resBreaks = [
              ...resBreaks,
              {
                description: b.description,
                start: parseISOString(b.start),
                end: parseISOString(b.end),
              },
            ];
          }
          const routine = {
            title: r.title,
            start: parseISOString(r.start),
            end: parseISOString(r.end),
            breaks: resBreaks,
          };

          store.addRoutine(routine);
        });
      } catch (e) {
        e.response ? console.log(e.response) : console.log(e);
      }
    };

    getData();
  }, [store, store.refreshUseEffect]);

  useInterval(() => {
    if (store.routineStarted && !store.activeBreak) {
      const routine = store.routineStarted;
      const now = new Date();
      routine.breaks.forEach((b) => {
        const startH = b.start.getHours();
        const endH = b.end.getHours();
        const startM = b.start.getMinutes();
        const endM = b.end.getMinutes();
        if (startH === now.getHours() && startM === now.getMinutes()) {
          try {
            setActiveBreak({ status: true });
          } catch (e) {
            console.log(e.response);
          }
          setActiveBreak(b);
          setTitle(b.description);
          setOptions({
            tag: Date.now(),
            body: `Time for your break!`,
            lang: 'eng',
            dir: 'ltr',
          });
        }
        if (endH === now.getHours() && endM === now.getMinutes()) {
          try {
            setActiveBreak({ status: false });
          } catch (e) {
            console.log(e.response);
          }
          setTitle(b.description);
          setOptions({
            tag: Date.now(),
            body: `Your break is over, get back to work!`,
            lang: 'eng',
            dir: 'ltr',
          });
        }
      });
    }
  }, 10000);

  return (
    <Container>
      {showView === 0 ? (
        <div className="flex top-level-component">
          <h2 className="align-self-center text-align-center">Loading...</h2>
        </div>
      ) : (
        <>
          <Row>
            <h1>
              Habit House{' '}
              {user && <Button onClick={handleLogout}>Logout</Button>}
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
        </>
      )}
      <Notification
        ignore={ignore}
        title={title}
        options={options}
        notSupported={handleNotSupported}
        onPermissionGranted={handlePermissionGranted}
        onPermissionDenied={handlePermissionDenied}
      />
    </Container>
  );
});

export default App;
