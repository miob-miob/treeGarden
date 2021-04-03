/* eslint-disable no-underscore-dangle */
import {
  createTreeNode,
  dataSetToTreeNode,
  stopIfPure,
  dataPartitionsToDataPartitionCounts,
  dataPartitionsToClassCounts
} from './treeNode';
import { simple } from '../sampleDataSets';

import { buildAlgorithmConfiguration } from '../algorithmConfiguration/buildAlgorithmConfiguration';
import { getGiniIndexForSplit } from './impurity/gini';


// treeForTesting not used atm but can be handy soon
const rootNode = createTreeNode({ chosenSplitCriteria: ['color', '=='] });
const nodeTwo = createTreeNode({ chosenSplitCriteria: ['size', '>', 2.5] });
const nodeThree = createTreeNode({ chosenSplitCriteria: ['size', '>', 3.5] });
const nodeFour = createTreeNode({ chosenSplitCriteria: ['wind', '=='] });
const nodeFive = createTreeNode({ chosenSplitCriteria: ['weight', '=='] });

rootNode.childNodes = {
  blue: nodeTwo,
  black: nodeThree
};

nodeThree.childNodes = {
  true: nodeFour,
  false: createTreeNode()
};

nodeFour.childNodes = {
  strong: nodeFive,
  weak: createTreeNode()
};

// bit of e2e test
test('dataSetToTreeNode', () => {
  const config = buildAlgorithmConfiguration(simple, {
    biggerImpurityScoreBetterSplit: false,
    impurityScoringForSplit: getGiniIndexForSplit
  });
  const expectedNewTreeNode = {
    childNodes: null,
    isLeaf: false,
    chosenSplitCriteria: ['color', '=='],
    alreadyUsedSplits: [
      ['color', '==']
    ],
    impurityScore: 0,
    depth: 0,
    bestSplits: [
      ['color', '=='],
      ['size', '>', 2.5],
      ['size', '>', 3.5]
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
    },
    dataPartitionsCounts: {
      black: { left: 2 },
      white: { right: 3 }
    },
    classCounts: { left: 2, right: 3 }
  };

  const newNode = dataSetToTreeNode(simple, config, null);
  // we do not want calculate gini by hand ;)
  newNode.bestSplits = newNode.bestSplits.map(({ split }) => split);
  expect(newNode).toStrictEqual(expectedNewTreeNode);
});


test('willTreeGrowFurther', () => {
  const conf = buildAlgorithmConfiguration(simple);
  const node = {
    childNodes: null,
    isLeaf: false,
    chosenSplitCriteria: ['color', '=='],
    impurityScore: 0,
    bestSplits: [
      ['color', '=='],
      ['size', '>', 2.5],
      ['size', '>', 3.5]
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


test('dataPartitionsToDataPartitionCounts and classCounts', () => {
  // simple set  - size > 3.5
  const dataPartitions = {
    true: [
      {
        _class: 'left', color: 'black', size: 4, _label: '2'
      },
      {
        _class: 'right', color: 'white', size: 4, _label: '3'
      }
    ],
    false: [
      {
        _class: 'right', color: 'white', size: 2, _label: '4'
      },
      {
        _class: 'right', color: 'white', size: 2, _label: '5'
      },
      {
        _class: 'left', color: 'black', size: 3, _label: '1'
      }
    ]
  };

  const expectedCounts = {
    true: {
      left: 1,
      right: 1
    },
    false: {
      right: 2,
      left: 1
    }
  };
  expect(dataPartitionsToDataPartitionCounts(dataPartitions)).toStrictEqual(expectedCounts);
  expect(dataPartitionsToClassCounts(dataPartitions)).toStrictEqual({ left: 2, right: 3 });
});
