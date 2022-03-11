import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';
import { Button, Modal, Row, Col, Alert } from 'react-bootstrap';
import { useMainStore } from '../stores/MainStore';

const EditRoutineModal = observer(({ routine }) => {
  const store = useMainStore();
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [breakAlertMessage, setBreakAlertMessage] = useState('')


  const pad = (toPad) => {
    if (toPad < 10) {
      return `0${toPad}`;
    }
    return toPad;
  };

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
      setBreakAlertMessage('')
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
        setBreakAlertMessage('Type missing')

      } else if (breakStartTime === '') {
        setBreakAlertMessage('Start time missing');

      } else {
        setBreakAlertMessage('End time missing')
        
      }
    }
  };

  const handleSubmit = () => {
    if (title !== '' && startTime !== '' && endTime !== '' && !showAlert) {
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
            <Row style={{ width: '100%' }} className="addBreakButtonRow">
              <Button className="addBreakButton" onClick={handleAddBreak}>
                Add Break
              </Button>
            </Row>
            {breakAlertMessage !== '' && <Alert className='mb-1' variant='danger'>{breakAlertMessage}</Alert>}

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
      </Modal>
    </>
  );
});

export default EditRoutineModal;
