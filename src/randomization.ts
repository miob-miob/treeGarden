
export const randInt = (min:number, max:number) => Math.floor(Math.random() * ((max - min) + 1)) + min;

export const chooseOne = (arrayToChooseFrom:any[]) => arrayToChooseFrom[randInt(0, arrayToChooseFrom.length - 1)];

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
