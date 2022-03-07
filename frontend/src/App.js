import React from "react";
import { Alert, Button } from "react-bootstrap";
import Notification from "react-web-notification";

const App = () => {
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

  return (
    <div>
      <h1>Hello world!</h1>
      <Alert>hello</Alert>
      <Button onClick={setButtonClicked}>yay</Button>
      <Notification
          ignore={false}
          onShow={onShow}
          onClick={onClick}
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
 