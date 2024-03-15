const convertId = (id: number = 0): string => {
  let newId;
  if (id < 10) {
    newId = `#00${id}`;
    return newId;
  } else if (id < 100) {
    newId = `#0${id}`;
    return newId;
  } else {
    newId = `#${id}`;
    return newId;
  }
};

export default convertId;
