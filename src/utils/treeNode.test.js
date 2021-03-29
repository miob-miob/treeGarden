import { createTreeNode, getAlreadyUsedCriteria } from './treeNode';


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
