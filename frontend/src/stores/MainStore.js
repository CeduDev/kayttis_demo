import { makeAutoObservable } from 'mobx';
import React, { createContext, useContext } from 'react';

/*
interface Break {
  start: Date;
  length: number;
  description: string;
}

interface Routine {
  title: string;
  start: Date;
  stop: Date;
  breaks: Break[];
}
*/

class MainStore {
  routines = [
    {
      title: '',
      start: new Date(),
      stop: new Date(),
      breaks: [
        {
          start: new Date(),
          length: 300, //in seconds, so 5 min
          description: 'default desc',
        },
      ],
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  setFirst = (string) => {
    this.first = string;
  };

  addRoutine = (routine) => {
    this.routines = [...this.routines, routine];
  };
}

// new MainStore() is provided to createContext even though that instance is never going to be used
// since we're going to provided another instance to it later. It merely exists so that Typescript
// won't freak out
const MainStoreContext = createContext(new MainStore());

const MainStoreProvider = ({ store, children }) => (
  <MainStoreContext.Provider value={store}>
    {children}
  </MainStoreContext.Provider>
);

const useMainStore = () => useContext(MainStoreContext);

export { MainStore, MainStoreProvider, useMainStore };