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
  uuid: '9b5aae79-65fc-42ce-a9a2-e3be1486dcc6',
  childNodes: {
    black: {
      isLeaf: true, chosenSplitCriteria: ['size', '>', 3.5], impurityScore: 0, bestSplits: [{ split: ['size', '>', 3.5], score: 0 }], dataPartitionsCounts: { false: { left: 1 }, true: { left: 1 } }, classCounts: { left: 2 }, depth: 1, alreadyUsedSplits: [['color', '=='], ['size', '>', 3.5]], uuid: '0daaa272-bd7c-452c-85a2-97bc3dc2676c'
    },
    white: {
      isLeaf: true, chosenSplitCriteria: ['size', '>', 3], impurityScore: 0, bestSplits: [{ split: ['size', '>', 3], score: 0 }], dataPartitionsCounts: { true: { right: 1 }, false: { right: 2 } }, classCounts: { right: 3 }, depth: 1, alreadyUsedSplits: [['color', '=='], ['size', '>', 3]], uuid: '857ea09a-bdec-4f61-972f-1f5a517276dc'
    }
  }
};

