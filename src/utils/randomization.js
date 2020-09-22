
export const randInt = (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min;

export const chooseOne = (arrayToChooseFrom) => arrayToChooseFrom[randInt(0, arrayToChooseFrom.length - 1)];
