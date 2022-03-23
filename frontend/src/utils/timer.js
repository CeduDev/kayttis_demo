import { useRef, useEffect } from 'react';

export const timer = (stateHandler, time = false) => {
  stateHandler(true);

  setTimeout(
    () => {
      stateHandler(false);
    },
    time ? time : 6000
  );
};

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
