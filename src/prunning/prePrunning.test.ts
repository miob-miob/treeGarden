/* eslint-disable no-underscore-dangle */
import { composeStopFunctions, stopIfPure } from './prePrunning';
import { buildAlgorithmConfiguration } from '../algorithmConfiguration/buildAlgorithmConfiguration';
import { simple } from '../sampleDataSets';

test('willTreeGrowFurther', () => {
  const conf = buildAlgorithmConfiguration(simple);
  const node = {
    childNodes: undefined,
    isLeaf: false,
    chosenSplitCriteria: ['color', '=='],
    impurityScore: 0,
    bestSplits: [
      { split: ['color', '=='], score: 0.1 },
      { split: ['size', '>', 2.5], score: 0.12 },
      { split: ['size', '>', 3.5], score: 0.3 }
    ],
    dataPartitions: {
      black: [
        {
          _class: 'left', color: 'black', size: 3, _label: '1'
        },
        {
          _class: 'left', color: 'black', size: 4, _label: '2'
        }
      ],
      white: [
        {
          _class: 'right', color: 'white', size: 4, _label: '3'
        },
        {
          _class: 'right', color: 'white', size: 2, _label: '4'
        },
        {
          _class: 'right', color: 'white', size: 2, _label: '5'
        }
      ]
    }
  };

  expect(stopIfPure(node, conf)).toBeFalsy();
  node.dataPartitions.black[0]._class = 'right';
  node.dataPartitions.black[1]._class = 'right';
  expect(stopIfPure(node, conf)).toBeTruthy();
});


test('composeStopFunctions', () => {
  const config = buildAlgorithmConfiguration(simple, {});
  const stoppedOne = jest.fn(() => true);
  const notStoppedOne = jest.fn(() => false);
  const composedStopper = composeStopFunctions(stoppedOne, notStoppedOne);
  expect(composedStopper({ isLeaf: false }, config)).toBeTruthy();
  expect(stoppedOne.mock.calls.length).toBe(1);
  expect(notStoppedOne.mock.calls.length).toBe(0);

  const notStoppedTwo = jest.fn(() => false);
  const anotherNotStoppedTwo = jest.fn(() => false);

  const anotherComposedStopper = composeStopFunctions(notStoppedTwo, anotherNotStoppedTwo);
  expect(anotherComposedStopper({ isLeaf: false }, config)).toBeFalsy();
  expect(notStoppedTwo.mock.calls.length).toBe(1);
  expect(anotherNotStoppedTwo.mock.calls.length).toBe(1);
});
