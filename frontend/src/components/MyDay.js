import React, { useEffect } from 'react';
import { Container, Row, Button, Alert } from 'react-bootstrap';
import { useMainStore } from '../stores/MainStore';
import { observer } from 'mobx-react-lite';
import Emoji from './Emoji';
import { getRoutines } from '../services/getRoutines';
import { parseISOString } from '../utils/dates';

const MyDay = observer(({ routineSelected, setRoutineSelected }) => {
  const mainStore = useMainStore();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getRoutines();
        await mainStore.deleteAllRoutines();

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

          mainStore.addRoutine(routine);
        });
      } catch (e) {
        e.response ? console.log(e.response) : console.log(e);
      }
    };

    getData();
  }, [mainStore]);

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

  return (
    <Container>
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
