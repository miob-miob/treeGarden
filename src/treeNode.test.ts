/* eslint-disable no-underscore-dangle,max-len */
import {
  createTreeNode,
  dataSetToTreeNode,
  dataPartitionsToDataPartitionCounts,
  dataPartitionsToClassCounts,
  getMostCommonClassForNode,
  TreeGardenNode,
  getAllInnerNodes,
  getFlattenTree,
  getTreeNodeById, getAllLeafNodes, getTreeStages
} from './treeNode';
import { simple } from './sampleDataSets';
import { tennisTree } from './sampleTrainedTrees/tennisTree';
import { simpleTree } from './sampleTrainedTrees/simpleTree';

import { buildAlgorithmConfiguration } from './algorithmConfiguration';
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
    biggerScoreBetterSplit: false,
    getScoreForSplit: getGiniIndexForSplit
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
  const nonLeafNodes = getAllInnerNodes(tennisTree);
  const chosenCriteria = nonLeafNodes.map((node) => node.chosenSplitCriteria![0]);
  const expectedCriteria = ['outlook', 'humidity', 'wind'];
  expect(chosenCriteria.length).toBe(expectedCriteria.length);
  expect(chosenCriteria.sort()).toEqual(expectedCriteria.sort());

  const leafNodesOfSimpleTree = getAllInnerNodes(simpleTree);
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

const getTenisTreeNode = (id:string) => getTreeNodeById(tennisTree, id);
test('getTreeStages', () => {
  const stagesOfTennisTree = [
    [[getTenisTreeNode('f2f856dc-c656-4689-b32a-a4b3a4c3aaab')]],
    [[getTenisTreeNode('1aca91e4-8d1c-431a-8466-8181ef547f72'), getTenisTreeNode('8e64ed62-643a-444b-a03d-b1a215121376'), getTenisTreeNode('c4402f7c-f227-48ab-8040-a703dd34e7ab')]],
    [[getTenisTreeNode('dc881780-2267-44a7-b978-6b21d23d6460'), getTenisTreeNode('ecd8f049-40a9-4d2d-bb97-3b0bf37ae5c8')], [getTenisTreeNode('9f156fc0-3f82-4a31-863e-108bfb37fc60'), getTenisTreeNode('8bbace58-e339-4e42-a5a0-5bab22b62724')]]
  ];

  expect(getTreeStages(tennisTree)).toEqual(stagesOfTennisTree);
});


