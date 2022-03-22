export const timer = (stateHandler, time = false) => {
  stateHandler(true);

  setTimeout(
    () => {
      stateHandler(false);
    },
    time ? time : 6000
  );
};
