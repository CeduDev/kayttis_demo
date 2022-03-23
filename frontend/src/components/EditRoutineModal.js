import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';
import { Button, Modal, Row, Col, Alert, Dropdown } from 'react-bootstrap';
import { useMainStore } from '../stores/MainStore';
import { pad } from '../utils/dates';

const EditRoutineModal = observer(({ routine }) => {
  const store = useMainStore();
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [breakAlertMessage, setBreakAlertMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const [title, setTitle] = useState(routine.title);
  const [startTime, setStartTime] = useState(
    `${pad(routine.start.getHours())}:${pad(routine.start.getMinutes())}`
  );
  const [endTime, setEndTime] = useState(
    `${pad(routine.end.getHours())}:${pad(routine.end.getMinutes())}`
  );

  const [breakType, setBreakType] = useState('');
  const [breakStartTime, setBreakStartTime] = useState('');
  const [breakEndTime, setBreakEndTime] = useState('');

  const [breaks, setBreaks] = useState(routine.breaks);

  const handleAddBreak = () => {
    if (breakType !== '' && breakStartTime !== '' && breakEndTime !== '') {
      setBreakAlertMessage('');
      const start = breakStartTime.split(':').map((x) => Number(x));
      const end = breakEndTime.split(':').map((x) => Number(x));
      const startDate = new Date();
      const endDate = new Date();
      startDate.setHours(start[0], start[1]);
      endDate.setHours(end[0], end[1]);
      setBreaks((breaks) =>
        [
          ...breaks,
          {
            description: breakType,
            start: startDate,
            end: endDate,
          },
        ].sort((a, b) => a.start - b.start)
      );
      setBreakType('');
      setBreakStartTime('');
      setBreakEndTime('');
    } else {
      if (breakType === '') {
        setBreakAlertMessage('Type missing');
      } else if (breakStartTime === '') {
        setBreakAlertMessage('Start time missing');
      } else {
        setBreakAlertMessage('End time missing');
      }
    }
  };

  const handleSubmit = () => {
    if (title !== '' && startTime !== '' && endTime !== '' && !showAlert) {
      setAlertMessage('');
      const start = startTime.split(':').map((x) => Number(x));
      const end = endTime.split(':').map((x) => Number(x));
      const startDate = new Date();
      const endDate = new Date();
      startDate.setHours(start[0], start[1]);
      endDate.setHours(end[0], end[1]);
      store.editRoutine(routine.title, {
        title: title,
        start: startDate,
        end: endDate,
        breaks: breaks,
      });

      setShow(false);
    } else {
      if (title === '') {
        setAlertMessage('Routine name missing');
      } else if (startTime === '') {
        setAlertMessage('Start time missing');
      } else {
        setAlertMessage('End time missing');
      }
    }
  };

  useEffect(() => {
    if (
      store.routines.find((r) => r.title === title) &&
      title !== routine.title
    ) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [routine.title, store.routines, title]);

  const defaultBreaks = [
    {
      description: 'coffee break',
      start: '09:30',
      end: '09:45',
    },
    {
      description: 'lunch',
      start: '12:00',
      end: '12:30',
    },
    {
      description: 'walk',
      start: '14:00',
      end: '14:30',
    },
  ];

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Edit
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit routine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Routine name:</span>
          <input
            className="textInput"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          {showAlert && (
            <Alert variant="danger">this title already exists</Alert>
          )}
          <span>Start time: </span>
          <input
            type="time"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
          ></input>
          <br />
          <span>End time: </span>
          <input
            type="time"
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
          ></input>
          <br />
          <span>Breaks:</span>
          <br />
          <div className="addBreak">
            <span>Type:</span>
            <br />
            <input
              className="textInput"
              type="text"
              value={breakType}
              onChange={(event) => setBreakType(event.target.value)}
            />
            <span>Start time: </span>
            <input
              type="time"
              value={breakStartTime}
              onChange={(event) => setBreakStartTime(event.target.value)}
            ></input>
            <br />
            <span>End time: </span>
            <input
              type="time"
              value={breakEndTime}
              onChange={(event) => setBreakEndTime(event.target.value)}
            ></input>
            <br />
            <Row className="addBreakButtonRow">
              <Button className="addBreakButton" onClick={handleAddBreak}>
                Add Break
              </Button>
              <Dropdown>
                <Dropdown.Toggle>Default breaks</Dropdown.Toggle>
                <Dropdown.Menu>
                  {defaultBreaks.map((b) => {
                    return (
                      <Dropdown.Item
                        onClick={() => {
                          setBreakType(b.description);
                          setBreakStartTime(b.start);
                          setBreakEndTime(b.end);
                        }}
                      >
                        {b.description}: {b.start}-{b.end}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Row>
            {breakAlertMessage !== '' && (
              <Alert className="mb-1" variant="danger">
                {breakAlertMessage}
              </Alert>
            )}
          </div>
          {breaks.map((b) => (
            <Col className="breakCol">
              {`${b.description}, starting: ${pad(b.start.getHours())}:${pad(
                b.start.getMinutes()
              )}, ending: ${pad(b.end.getHours())}:${pad(b.end.getMinutes())}`}
              <Button
                onClick={() => {
                  setBreaks((temp) => temp.filter((br) => br !== b));
                }}
              >
                delete
              </Button>
            </Col>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit}>
            Submit changes
          </Button>
        </Modal.Footer>
        {alertMessage !== '' && (
          <Alert className="ms-2 me-2 mb-1" variant="danger">
            {alertMessage}
          </Alert>
        )}
      </Modal>
    </>
  );
});

export default EditRoutineModal;
