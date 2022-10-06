/* eslint-disable no-underscore-dangle */
import {
  stopRules, stopIfDepthIs, stopIfMinimalNumberOfSamplesInInnerNode, stopIfPure
} from './prePrunning';
import {
  TreeGardenConfiguration,
  buildAlgorithmConfiguration
} from '../algorithmConfiguration/buildAlgorithmConfiguration';
import { simpleSet } from '../sampleDataSets';
import { TreeGardenNode } from '../treeNode';

test('willTreeGrowFurther', () => {
  const conf = buildAlgorithmConfiguration(simpleSet);
  const node = {
    id: 'something',
    depth: 2,
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


  // @ts-expect-error
  expect(stopIfPure(node, conf)).toBeFalsy();
  node.dataPartitions.black[0]._class = 'right';
  node.dataPartitions.black[1]._class = 'right';
  // @ts-expect-error
  expect(stopIfPure(node, conf)).toBeTruthy();

  const depthStopperOne = stopIfDepthIs(1);
  const depthStopperTwo = stopIfDepthIs(2);
  const depthStopperThree = stopIfDepthIs(3);

  // @ts-expect-error
  expect(depthStopperOne(node, conf)).toBeTruthy();
  // @ts-expect-error
  expect(depthStopperTwo(node, conf)).toBeTruthy();
  // @ts-expect-error
  expect(depthStopperThree(node, conf)).toBeFalsy();
});

test('stopIfMinimalNumberOfSamplesInLeafNode', () => {
  const nodeWith4 = {
    classCounts: { left: 2, right: 1, white: 1 }
  };

  const nodeWith3Minimal = {
    classCounts: { left: 1, right: 1, white: 1 }
  };

  const stopper5 = stopIfMinimalNumberOfSamplesInInnerNode(5);
  const stopper2 = stopIfMinimalNumberOfSamplesInInnerNode(2);
  const stopper3 = stopIfMinimalNumberOfSamplesInInnerNode(3);

  expect(stopper3(nodeWith4 as unknown as TreeGardenNode, {} as TreeGardenConfiguration)).toBeFalsy();
  expect(stopper2(nodeWith4 as unknown as TreeGardenNode, {} as TreeGardenConfiguration)).toBeFalsy();
  expect(stopper5(nodeWith4 as unknown as TreeGardenNode, {} as TreeGardenConfiguration)).toBeTruthy();

  expect(stopper3(nodeWith3Minimal as unknown as TreeGardenNode, {} as TreeGardenConfiguration)).toBeTruthy();
  expect(stopper2(nodeWith3Minimal as unknown as TreeGardenNode, {} as TreeGardenConfiguration)).toBeFalsy();
  expect(stopper5(nodeWith3Minimal as unknown as TreeGardenNode, {} as TreeGardenConfiguration)).toBeTruthy();
});

test('stopRules', () => {
  const config = buildAlgorithmConfiguration(simpleSet, {});
  const stoppedOne = jest.fn(() => true);
  const notStoppedOne = jest.fn(() => false);
  const composedStopper = stopRules(stoppedOne, notStoppedOne);
  expect(composedStopper({ isLeaf: false } as TreeGardenNode, config)).toBeTruthy();
  expect(stoppedOne.mock.calls.length).toBe(1);
  expect(notStoppedOne.mock.calls.length).toBe(0);

  const notStoppedTwo = jest.fn(() => false);
  const anotherNotStoppedTwo = jest.fn(() => false);

  const anotherComposedStopper = stopRules(notStoppedTwo, anotherNotStoppedTwo);
  // @ts-expect-error
  expect(anotherComposedStopper({ isLeaf: false }, config)).toBeFalsy();
  expect(notStoppedTwo.mock.calls.length).toBe(1);
  expect(anotherNotStoppedTwo.mock.calls.length).toBe(1);
});
