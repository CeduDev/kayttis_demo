import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useMainStore } from '../stores/MainStore';
import AddRoutineModal from './AddRoutineModal';
import { Row, Col, Button } from 'react-bootstrap';
import EditRoutineModal from './EditRoutineModal';

const Routines = observer(() => {
  const store = useMainStore();
  const [r, setR] = useState(null);

  const pad = (toPad) => {
    if (toPad < 10) {
      return `0${toPad}`;
    }
    return toPad;
  };
  return (
    <>
      <AddRoutineModal routine={r} setRoutine={setR} />
      {store.routines.map((routine) => {
        return (
          <Row className="routineDiv">
            <Row>
              <Col className="routineCol">
                <h1>{routine.title}</h1>
              </Col>
              <Col className="routineCol">
                <h3>{`Starting: ${pad(routine.start.getHours())}:${pad(
                  routine.start.getMinutes()
                )}`}</h3>
              </Col>
              <Col className="routineCol">
                <h3>{`Ending: ${pad(routine.end.getHours())}:${pad(
                  routine.end.getMinutes()
                )}`}</h3>
              </Col>
              <Col className="routineCol" xs={1} sm={1}>
                <EditRoutineModal routine={routine} />
              </Col>
              <Col className="routineCol" xs={1} sm={1}>
                <Button
                  onClick={() => store.deleteRoutine(routine.title)}
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
                          {`${b.description}, ${pad(b.start.getHours())}:${pad(
                            b.start.getMinutes()
                          )}-${pad(b.end.getHours())}:${pad(
                            b.end.getMinutes()
                          )}`}
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
    </>
  );
});

export default Routines;
