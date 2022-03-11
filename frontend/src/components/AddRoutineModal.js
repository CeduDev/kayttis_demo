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

  const [breakAlertMessage, setBreakAlertMessage] = useState('')
  const [alertMessage, setAlertMessage] = useState('')


  const store = useMainStore();

  const handleSubmit = () => {
    if (title !== '' && startTime !== '' && endTime !== '' && !showAlert) {
      setAlertMessage('')
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
    } else {
      if (title === '') {
        setAlertMessage('title missing')
      } else if (startTime === '') {
        setAlertMessage('Start time missing');
      } else {
        setAlertMessage('End time missing')
      }
    }
  };

  const handleAddBreak = () => {
    console.log(breakType);
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
            {breakAlertMessage !== '' && <Alert variant='danger'>breakAlertMessage</Alert>}
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
        <Modal.Footer style={{padding: '0rem'}}className='me-2'>
          
          <Button variant="success" onClick={handleSubmit}>
            Add routine
          </Button>
        </Modal.Footer>
        {alertMessage !== '' && <Alert className='ms-2 me-2 mb-1'variant='danger'>{alertMessage}</Alert>}
      </Modal>
    </>
  );
});

export default AddRoutineModal;
