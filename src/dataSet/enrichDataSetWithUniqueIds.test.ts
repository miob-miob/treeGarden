/* eslint-disable no-underscore-dangle */
import { enrichDataSetWithUniqueIds } from './enrichDataSetWithUniqueIds';
import { TreeGardenDataSample } from './set';

describe('enrichDataSetWithUniqueIds', () => {
  const consoleWarnSpy = jest.spyOn(console, 'warn');
  beforeEach(() => {
    consoleWarnSpy.mockReset();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('Add ids and run warning', () => {
    const length = 5;
    const dataSetWOIds = Array.from(Array(5)).map(() => ({})) as TreeGardenDataSample[];
    enrichDataSetWithUniqueIds(dataSetWOIds);
    expect(consoleWarnSpy).toHaveBeenCalled();
    expect(dataSetWOIds.filter((item) => Boolean(item._id)).length).toBe(length);
  });

  test('Do not warn, when all samples has unique _id', () => {
    const length = 3;
    const setWithUniqueIds = Array.from(Array(length)).map((item, index) => ({ _id: index })) as TreeGardenDataSample[];
    enrichDataSetWithUniqueIds(setWithUniqueIds);
    expect(consoleWarnSpy).not.toBeCalled();
    expect(setWithUniqueIds.filter((item) => item._id !== undefined).length).toBe(length);
  });
  test('Throw error, when _id is not unique', () => {
    const dataSetWithNotUniqueIds = [
      { _id: 'yay' },
      { _id: 'yayay' },
      { _id: 'yay' }
    ] as TreeGardenDataSample[];

    expect(() => {
      enrichDataSetWithUniqueIds(dataSetWithNotUniqueIds);
    }).toThrowError();
    expect(consoleWarnSpy).not.toBeCalled();
  });
});
