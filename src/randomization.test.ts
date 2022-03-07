import { chooseManyWithoutRepeats } from './randomization';

test('chooseManyWithoutRepeats', () => {
  const arrayOne = [3, 2, 4];
  expect(chooseManyWithoutRepeats(arrayOne, 100).sort()).toEqual([2, 3, 4]);
  const resultTwo = chooseManyWithoutRepeats(arrayOne, 2).sort();
  expect([[2, 3], [2, 4], [3, 4]].map((x) => JSON.stringify(x)).includes(JSON.stringify(resultTwo))).toBeTruthy();
});
