import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { MainStore, MainStoreProvider } from './stores/MainStore';

const mainStore = new MainStore();

ReactDOM.render(
  <React.StrictMode>
    <MainStoreProvider store={mainStore}>
      <App />
    </MainStoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
