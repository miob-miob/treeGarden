/* eslint-disable no-underscore-dangle */
import {
  createTreeNode,
  dataSetToTreeNode,
  dataPartitionsToDataPartitionCounts,
  dataPartitionsToClassCounts,
  getMostCommonClassForNode,
  TreeGardenNode,
  getAllNonLeafNodes,
  getFlattenTree,
  getTreeNodeById, getNumberOfTreeNodes, getAllLeafNodes, getNumberOfSamplesInNode
} from './treeNode';
import { simple } from './sampleDataSets';
import { tennisTree } from './sampleTrainedTrees/tennisTree';
import { simpleTree } from './sampleTrainedTrees/simpleTree';

import { buildAlgorithmConfiguration } from './algorithmConfiguration/buildAlgorithmConfiguration';
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
    isLeaf: false,
    id: 'z85',
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

  const newNode = dataSetToTreeNode(simple, config);
  // remove uuid for comparison
  // @ts-ignore
  newNode.id = 'z85';
  // we do not want calculate gini by hand ;)
  // @ts-expect-error
  newNode.bestSplits = newNode.bestSplits.map(({ split }) => split);
  expect(newNode).toStrictEqual(expectedNewTreeNode);
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
  expect(dataPartitionsToClassCounts(Object.values(dataPartitions).flat())).toStrictEqual({ left: 2, right: 3 });
});

test('getMostCommonClassFromNode', () => {
  const nodeLikeOne = {
    classCounts: { green: 2, yellow: 3 }
  };
  const nodeLikeTwo = {
    classCounts: { green: 2, yellow: 2 }
  };
  const nodeLikeThree = {
    classCounts: { green: 2, yellow: 2, black: 2 }
  };
  expect(getMostCommonClassForNode(nodeLikeOne as unknown as TreeGardenNode)).toBe('yellow');
  expect(getMostCommonClassForNode(nodeLikeTwo as unknown as TreeGardenNode)).toBe('green');
  expect(getMostCommonClassForNode(nodeLikeThree as unknown as TreeGardenNode)).toBe('black');
});

test('getFlattenTree', () => {
  const uuidsOfTennisTreeNodes = getFlattenTree(tennisTree)
    .map((node) => node.id);
  expect(new Set(uuidsOfTennisTreeNodes).size).toBe(8);
});

test('getAllNonLeafNodes', () => {
  const nonLeafNodes = getAllNonLeafNodes(tennisTree);
  const chosenCriteria = nonLeafNodes.map((node) => node.chosenSplitCriteria![0]);
  const expectedCriteria = ['outlook', 'humidity', 'wind'];
  expect(chosenCriteria.length).toBe(expectedCriteria.length);
  expect(chosenCriteria.sort()).toEqual(expectedCriteria.sort());

  const leafNodesOfSimpleTree = getAllNonLeafNodes(simpleTree);
  expect(leafNodesOfSimpleTree[0]).toBe(simpleTree);
});

test('getAllLeafNodes', () => {
  expect(getAllLeafNodes(simpleTree).length).toBe(2);
});

test('getTreeNodeById', () => {
  const someNode = tennisTree.childNodes.Rain.childNodes.Weak;
  const someNodeId = someNode.id;
  expect(getTreeNodeById(tennisTree, someNodeId)).toBe(someNode);
});

test('getNumberOfTreeNodes', () => {
  expect(getNumberOfTreeNodes(simpleTree)).toBe(3);
  expect(getNumberOfTreeNodes(tennisTree.childNodes.Rain)).toBe(3);
});


test('getNumberOfSamplesInNode', () => {
  expect(getNumberOfSamplesInNode(tennisTree)).toBe(14);
});
