import { makeAutoObservable } from 'mobx';
import React, { createContext, useContext } from 'react';

class MainStore {
  first = '';

  constructor() {
    makeAutoObservable(this);
  }

  setFirst = (string) => {
    this.first = string;
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
