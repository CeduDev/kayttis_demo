import React, { useState } from 'react';
import {
  Container,
  Row,
  Button,
  InputGroup,
  DropdownButton,
  Dropdown,
  Col,
  Alert,
} from 'react-bootstrap';
import { useMainStore } from '../stores/MainStore';
import { observer } from 'mobx-react-lite';
import AddRoutineModal from './AddRoutineModal';
import Emoji from './Emoji';

const MyDay = observer(() => {
  const [routineSelected, setRoutineSelected] = useState(null);

  const handleRoutineSelect = (routine) => {
    setRoutineSelected(routine);
  };

  const startDay = async () => {
    await mainStore.setRoutineStarted(routineSelected);
    setRoutineSelected(null);
  };

  const stopDay = () => {
    mainStore.clearRoutineStarted();
  };

  const pad = (toPad) => {
    if (toPad < 10) {
      return `0${toPad}`;
    }
    return toPad;
  };

  const mainStore = useMainStore();

  return (
    <Container>
      <Row className="mb-3">
        <Col xs="auto" sm="auto">
          <InputGroup>
            <DropdownButton
              title="Use existing routine"
              drop="down"
              disabled={mainStore.routineStarted !== null}
            >
              {mainStore.routines.length > 0 ? (
                mainStore.routines.map((routine) => (
                  <Dropdown.Item
                    key={routine.title}
                    as="button"
                    onClick={() => handleRoutineSelect(routine)}
                  >
                    {routine.title}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item>You do not have any routines</Dropdown.Item>
              )}
            </DropdownButton>
          </InputGroup>
        </Col>
        <Col xs="auto" sm="auto">
          <AddRoutineModal />
        </Col>
      </Row>
      {mainStore.routineStarted === null && (
        <Row>
          {routineSelected === null ? (
            <Alert variant="danger">Please select a routine!</Alert>
          ) : (
            <Alert variant="info">
              You have selected the routine: {routineSelected.title}
            </Alert>
          )}
        </Row>
      )}
      <Row>
        <Button
          variant="success"
          onClick={async () => await startDay()}
          disabled={
            routineSelected === null || mainStore.routineStarted !== null
          }
        >
          Start My Day
        </Button>
      </Row>
      {mainStore.routineStarted !== null && (
        <>
          <Row className="mb-3">
            <Button variant="danger" onClick={stopDay}>
              Stop My Day
            </Button>
          </Row>
          <Row>
            <Alert variant="info">
              Ongoing routine <strong>{mainStore.routineStarted.title}</strong>{' '}
              with the following breaks:
              {mainStore.routineStarted.breaks.length > 0 && (
                <ol>
                  {mainStore.routineStarted.breaks.map((b, idx) => {
                    const d = new Date();
                    return (
                      <li key={idx}>
                        <span
                          className={
                            b.end < d
                              ? 'break-end'
                              : b.end > d && b.start < d
                              ? 'break-ongoing'
                              : ''
                          }
                        >
                          {`${b.description}, ${pad(b.start.getHours())}:${pad(
                            b.start.getMinutes()
                          )}-${pad(b.end.getHours())}:${pad(
                            b.end.getMinutes()
                          )}`}
                        </span>
                        {b.end > d && b.start < d ? (
                          <>
                            {' '}
                            <span className="break-ongoing">
                              (ongoing)
                            </span>{' '}
                            <Emoji symbol="😎" label="sunglasses_guy" />
                          </>
                        ) : (
                          ''
                        )}
                        {b.end < d && (
                          <>
                            {' '}
                            <Emoji symbol="✅" label="checkmark" />
                          </>
                        )}
                      </li>
                    );
                  })}
                </ol>
              )}
            </Alert>
          </Row>
        </>
      )}
    </Container>
  );
});

export default MyDay;
