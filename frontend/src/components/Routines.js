import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useMainStore } from '../stores/MainStore';
import AddRoutineModal from './AddRoutineModal';
import { Row, Col, Button, Container, Alert } from 'react-bootstrap';
import EditRoutineModal from './EditRoutineModal';
import MyDay from './MyDay';
import { pad } from '../utils/dates';
import { deleteRoutine } from '../services/deleteRoutine';

const Routines = observer(() => {
  const store = useMainStore();
  const [r, setR] = useState(null);
  const [routineSelected, setRoutineSelected] = useState(null);
  const [deletedRoutines, setDeletedRoutines] = useState([]);

  const handleDelete = async (routine) => {
    try {
      await deleteRoutine({ routine_id: routine.id });
      setDeletedRoutines((old) => [...old, routine]);
      setTimeout(() => {
        setDeletedRoutines((old) => old.filter((l) => l !== routine));
      }, 5000);
      store.changeRefreshUseEffect();
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <>
      <Container className="px-0">
        <MyDay
          routineSelected={routineSelected}
          setRoutineSelected={setRoutineSelected}
        />
      </Container>
      <Container className="mt-3">
        <AddRoutineModal routine={r} setRoutine={setR} />
        {store.routines.map((routine) => {
          return (
            <Row className="routineDiv">
              <Row>
                <Col className="routineColLarge">
                  <h1>{routine.title}</h1>
                </Col>
                <Col className="routineColLarge">
                  <h3>{`Starting: ${pad(routine.start.getHours())}:${pad(
                    routine.start.getMinutes()
                  )}`}</h3>
                </Col>
                <Col className="routineColLarge">
                  <h3>{`Ending: ${pad(routine.end.getHours())}:${pad(
                    routine.end.getMinutes()
                  )}`}</h3>
                </Col>
                <Col className="routineCol">
                  <Button
                    onClick={() => setRoutineSelected(routine)}
                    style={{ whiteSpace: 'nowrap' }}
                    variant="success"
                  >
                    Select routine
                  </Button>
                </Col>
                <Col className="routineCol">
                  <EditRoutineModal routine={routine} />
                </Col>
                <Col className="routineCol">
                  <Button
                    onClick={() => handleDelete(routine)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
              {routine.breaks.length > 0 && (
                <>
                  <Row>
                    <h4>Breaks: </h4>
                  </Row>
                  <Row>
                    <ol>
                      {routine.breaks.map((b, idx) => {
                        return (
                          <li style={{ marginLeft: '2rem' }} key={idx}>
                            {`${b.description}, ${pad(
                              b.start.getHours()
                            )}:${pad(b.start.getMinutes())}-${pad(
                              b.end.getHours()
                            )}:${pad(b.end.getMinutes())}`}
                          </li>
                        );
                      })}
                    </ol>
                  </Row>
                </>
              )}
            </Row>
          );
        })}
        {deletedRoutines.map((r) => (
          <Alert variant="success" className="mb-0 mt-3">
            Successfully deleted routine {r.title}
          </Alert>
        ))}
      </Container>
    </>
  );
});

export default Routines;
