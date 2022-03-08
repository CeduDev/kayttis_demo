import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Row, Col, Alert } from 'react-bootstrap';
import { useMainStore } from '../stores/MainStore';

const AddRoutineModal = observer(({ routine, setRoutine }) => {
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('16:00');

  const [breakType, setBreakType] = useState('');
  const [breakStartTime, setBreakStartTime] = useState('');
  const [breakEndTime, setBreakEndTime] = useState('');

  const [breaks, setBreaks] = useState([]);

  const store = useMainStore();

  const handleSubmit = () => {
    if (title !== '' && startTime !== '' && endTime !== '' && !showAlert) {
      const start = startTime.split(':').map((x) => Number(x));
      const end = endTime.split(':').map((x) => Number(x));
      const startDate = new Date();
      const endDate = new Date();
      startDate.setHours(start[0], start[1]);
      endDate.setHours(end[0], end[1]);
      store.addRoutine({
        title: title,
        start: startDate,
        end: endDate,
        breaks: breaks,
      });
      setTitle('');
      setStartTime('08:00');
      setEndTime('16:00');
      setShow(false);
    }
  };

  const handleAddBreak = () => {
    if (breakType !== '' && breakStartTime !== '' && breakEndTime !== '') {
      const start = breakStartTime.split(':').map((x) => Number(x));
      const end = breakEndTime.split(':').map((x) => Number(x));
      const startDate = new Date();
      const endDate = new Date();
      startDate.setHours(start[0], start[1]);
      endDate.setHours(end[0], end[1]);
      setBreaks((breaks) => [
        ...breaks,
        {
          description: breakType,
          start: startDate,
          end: endDate,
        },
      ]);
      setBreakType('');
      setBreakStartTime('');
      setBreakEndTime('');
    }
  };

  const pad = (toPad) => {
    if (toPad < 10) {
      return `0${toPad}`;
    }
    return toPad;
  };

  useEffect(() => {
    if (store.routines.find((r) => r.title === title)) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [store.routines, title]);

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Create new routine
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create new routine</Modal.Title>
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
          </div>
          {breaks.map((b, idx) => (
            <Col className="breakCol" key={idx}>
              <span>
                {`${b.description}, ${pad(b.start.getHours())}:${pad(
                  b.start.getMinutes()
                )}-${pad(b.end.getHours())}:${pad(b.end.getMinutes())}`}
              </span>
              <Button
                onClick={() => {
                  setBreaks((temp) => temp.filter((br) => br !== b));
                }}
              >
                Remove
              </Button>
            </Col>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit}>
            Add routine
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default AddRoutineModal;
