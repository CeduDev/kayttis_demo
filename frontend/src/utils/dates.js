export const parseISOString = (string) => {
  const s = string.split(/\D+/);
  return new Date(Date.UTC(s[0], --s[1], s[2], s[3], s[4], s[5], s[6]));
};

export const pad = (toPad) => {
  if (toPad < 10) {
    return `0${toPad}`;
  }
  return toPad;
};
