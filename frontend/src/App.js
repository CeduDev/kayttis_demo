import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import Notification from "react-web-notification";

const App = () => {
  const [ignore, setIgnore] = useState(true)

  const setButtonClicked = () => {
    console.log('b')
  }

  const onShow = () => {
    console.log('on show')
  }
  const onClose = () => {
    console.log('on close')
  }
  const onClick = () => {
    console.log('on click')
  }

  const handlePermissionGranted = () => {
    console.log('Permission Granted');
    setIgnore(false)
  }
  const handlePermissionDenied = () => {
    console.log('Permission Denied');
    setIgnore(true)
  }
  const handleNotSupported = () => {
    console.log('Web Notification not Supported');
    setIgnore(true)
  }

  return (
    <div>
      <h1>Hello world!</h1>
      <Alert>hello</Alert>
      <Button onClick={setButtonClicked}>yay</Button>
      <Notification
          ignore={ignore}
          onShow={onShow}
          onClick={onClick}
          notSupported={handleNotSupported}
  onPermissionGranted={handlePermissionGranted}
  onPermissionDenied={handlePermissionDenied}
          onClose={onClose}
          onError={() => {
            console.log('error')
          }}
          timeout={5000}
          title={'very nice title'}
        />
    </div>
  );
}

export default App;
 