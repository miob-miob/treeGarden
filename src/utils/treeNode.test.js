import { createTreeNode, getAlreadyUsedCriteria, dataSetToTreeNode } from './treeNode';
import { simple } from '../sampleDataSets';

import { buildAlgorithmConfiguration } from '../algorithmConfiguration/buildAlgorithmConfiguration';
import { getGiniIndexForSplit } from './impurity/gini';


// treeForTesting
const rootNode = createTreeNode({ chosenSplitCriteria: ['color', '=='] });
const nodeTwo = createTreeNode({ chosenSplitCriteria: ['size', '>', 2.5] });
const nodeThree = createTreeNode({ chosenSplitCriteria: ['size', '>', 3.5] });
const nodeFour = createTreeNode({ chosenSplitCriteria: ['wind', '=='] });
const nodeFive = createTreeNode({ chosenSplitCriteria: ['weight', '=='] });

rootNode.childrenNodes = {
  blue: nodeTwo,
  black: nodeThree
};
nodeTwo.parentNode = rootNode;
nodeThree.parentNode = rootNode;

nodeThree.childrenNodes = {
  true: nodeFour,
  false: createTreeNode()
};
nodeFour.parentNode = nodeThree;

nodeFour.childrenNodes = {
  strong: nodeFive,
  weak: createTreeNode()
};
nodeFive.parentNode = nodeFour;

test('getAlreadyUsedCriteria', () => {
  const expectedUsedSplits = [
    ['weight', '=='],
    ['wind', '=='],
    ['size', '>', 3.5],
    ['color', '==']
  ];

  expect(getAlreadyUsedCriteria(nodeFive)).toStrictEqual(expectedUsedSplits);
});

// bit of e2e test
test('dataSetToTreeNode', () => {
  const config = buildAlgorithmConfiguration(
    { biggerImpurityScoreBetterSplit: false, impurityScoringForSplit: getGiniIndexForSplit },
    simple
  );
  const expectedNewTreeNode = {
    parentNode: null,
    childrenNodes: null,
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

  const newNode = dataSetToTreeNode(simple, config, null);
  // we do not want calculate gini by hand ;)
  newNode.bestSplits = newNode.bestSplits.map(({ split }) => split);
  expect(newNode).toStrictEqual(expectedNewTreeNode);
});
