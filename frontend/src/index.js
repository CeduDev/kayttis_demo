import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { MainStore, MainStoreProvider } from './stores/MainStore';
import { BrowserRouter as Router } from 'react-router-dom';

const mainStore = new MainStore();

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <MainStoreProvider store={mainStore}>
        <App />
      </MainStoreProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);
