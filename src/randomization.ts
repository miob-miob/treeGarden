
export const randInt = (min:number, max:number) => Math.floor(Math.random() * ((max - min) + 1)) + min;

export const chooseOne = <T> (arrayToChooseFrom:T[]) => arrayToChooseFrom[randInt(0, arrayToChooseFrom.length - 1)];

export const shuffleArray = (array:any[]) => {
  let { length } = array;
  while (length) {
    // eslint-disable-next-line no-plusplus
    const randomIndex = Math.floor(Math.random() * length--);

    // And swap it with the current element.
    const lastElement = array[length];
    // eslint-disable-next-line no-param-reassign
    array[length] = array[randomIndex];
    // eslint-disable-next-line no-param-reassign
    array[randomIndex] = lastElement;
  }
  return array;
};

export const chooseManyWithoutRepeats = <T>(arrayToChooseFrom:T[], nItems:number) => {
  let countDown = nItems;
  const workArray = [...arrayToChooseFrom];
  const result = [];
  // eslint-disable-next-line no-plusplus
  while (countDown-- > 0 && workArray.length > 0) {
    const index = randInt(0, workArray.length - 1);
    result.push(...workArray.splice(index, 1));
  }
  return result as T[];
};
