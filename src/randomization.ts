
export const randInt = (min:number, max:number) => Math.floor(Math.random() * ((max - min) + 1)) + min;

export const chooseOne = (arrayToChooseFrom:any[]) => arrayToChooseFrom[randInt(0, arrayToChooseFrom.length - 1)];
