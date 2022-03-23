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
import { getActiveRoutine } from './services/setActiveRoutine';
import { setBreak } from './services/setActiveBreak';

const App = observer(() => {
  const store = useMainStore();
  const history = useHistory();
  const [user, setUser] = useState(false);
  const [showView, setShowView] = useState(0);

  const [ignore, setIgnore] = useState(true);
  const [title, setTitle] = useState('');

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
        const activeRoutine = await getActiveRoutine();
        const activeId = activeRoutine.data[0]?.routine_id;
        if (activeId) {
          const activeBreak = activeRoutine.data[0]?.active_break;
          setIgnore(activeBreak);
        }

        await store.deleteAllRoutines();

        res.data.forEach(async (ro) => {
          const r = JSON.parse(ro.json_string);
          let resBreaks = [];
          const now = new Date();

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
          let breakStatus = false;

          const routine = {
            id: ro.id,
            title: r.title,
            start: parseISOString(r.start),
            end: parseISOString(r.end),
            breaks: resBreaks,
          };
          if (activeId && ro.id === activeId) {
            store.setRoutineStarted(routine);
            for await (const b of ro.breaks) {
              const startH = parseISOString(b.start).getHours();
              const endH = parseISOString(b.end).getHours();
              const startM = parseISOString(b.start).getMinutes();
              const endM = parseISOString(b.end).getMinutes();
              if (
                startH <= now.getHours() &&
                startM <= now.getMinutes() &&
                endH >= now.getHours() &&
                endM >= now.getMinutes()
              ) {
                breakStatus = true;
              }
            }
          }
          setBreak({ status: breakStatus });
          store.addRoutine(routine);
        });
      } catch (e) {
        e.response ? console.log(e.response) : console.log(e);
      }
    };
    getData();
  }, [store, store.refreshUseEffect]);

  useInterval(async () => {
    if (store.routineStarted) {
      const active = await getActiveRoutine();
      const activeBreak = active.data[0]?.active_break;
      console.log(activeBreak);
      const routine = store.routineStarted;
      const now = new Date();
      routine.breaks.forEach((b) => {
        const startH = b.start.getHours();
        const endH = b.end.getHours();
        const startM = b.start.getMinutes();
        const endM = b.end.getMinutes();
        if (
          endH === now.getHours() &&
          endM === now.getMinutes() &&
          activeBreak
        ) {
          setTitle('moro');
          try {
            setBreak({ status: false });
          } catch (e) {
            console.log(e.response);
          }
        } else if (
          startH <= now.getHours() &&
          startM <= now.getMinutes() &&
          endH >= now.getHours() &&
          endM >= now.getMinutes() &&
          !activeBreak
        ) {
          setTitle(b.description);
          try {
            setBreak({ status: true });
          } catch (e) {
            console.log(e.response);
          }
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
        ignore={false}
        title={title}
        notSupported={handleNotSupported}
        onPermissionGranted={handlePermissionGranted}
        onPermissionDenied={handlePermissionDenied}
      />
    </Container>
  );
});

export default App;
