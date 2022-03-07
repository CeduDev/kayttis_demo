import React from "react";
import { Alert, Button } from "react-bootstrap";
//import ReactNotifications from 'react-browser-notifications';

const App = () => {

  const setButtonClicked = () => {
    if(this.n.supported()) this.n.show();
  }

  /*const handleClick = (event) => {
    event.preventDefault();
    console.log('boi')
  }*/

  return (
    <div>
      <h1>Hello world!</h1>
      <Alert>hello</Alert>
      <Button onClick={setButtonClicked}>yay</Button>
{/*      <ReactNotifications
          onRef={ref => (this.n = ref)} // Required
          title="Hey There!" // Required
          body="This is the body"
          tag="abcdef"
          timeout="2000"
          onClick={event => handleClick(event)}
        />
  */}    </div>
  );
}

export default App;
 