/* eslint-disable max-len */

// learned with: {
//   impurityScoringForSplit: getGiniIndexForSplit,
//   biggerImpurityScoreBetterSplit: false
// }


export const simpleTree = {
  isLeaf: false,
  chosenSplitCriteria: ['color', '=='],
  impurityScore: 0,
  bestSplits: [{ split: ['color', '=='], score: 0 }, { split: ['size', '>', 2.5], score: 0.26666666666666666 }, { split: ['size', '>', 3.5], score: 0.4666666666666667 }],
  dataPartitionsCounts: { black: { left: 2 }, white: { right: 3 } },
  classCounts: { left: 2, right: 3 },
  depth: 0,
  alreadyUsedSplits: [['color', '==']],
  id: '67dd4c4f-3689-4e24-bfa8-f31ef9998a3e',
  childNodes: {
    black: {
      isLeaf: true, chosenSplitCriteria: ['size', '>', 3.5], impurityScore: 0, bestSplits: [{ split: ['size', '>', 3.5], score: 0 }], dataPartitionsCounts: { false: { left: 1 }, true: { left: 1 } }, classCounts: { left: 2 }, depth: 1, parentId: '67dd4c4f-3689-4e24-bfa8-f31ef9998a3e', alreadyUsedSplits: [['color', '=='], ['size', '>', 3.5]], id: 'aefc8c56-541f-45be-b22e-9f3bfd03d885'
    },
    white: {
      isLeaf: true, chosenSplitCriteria: ['size', '>', 3], impurityScore: 0, bestSplits: [{ split: ['size', '>', 3], score: 0 }], dataPartitionsCounts: { true: { right: 1 }, false: { right: 2 } }, classCounts: { right: 3 }, depth: 1, parentId: '67dd4c4f-3689-4e24-bfa8-f31ef9998a3e', alreadyUsedSplits: [['color', '=='], ['size', '>', 3]], id: '3984146e-6a8c-489b-9856-e8886d8e9709'
    }
  }
};

