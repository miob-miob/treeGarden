import { getMergedCountObjects } from './mergeSumObjects';


test('getMergedCountObjects', () => {
  const countObjectsToMerge: { [key:string]:number }[] = [
    { a: 2, b: 4, c: 1 },
    { b: 4, d: 5 },
    { b: 1, x: 2 }
  ];

  expect(getMergedCountObjects(countObjectsToMerge)).toEqual({
    a: 2, b: 9, c: 1, d: 5, x: 2
  });
});
