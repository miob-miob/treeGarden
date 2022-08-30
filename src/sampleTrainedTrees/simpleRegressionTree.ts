/* eslint-disable max-len */
export const simpleRegressionTree = {
  isLeaf: false,
  chosenSplitCriteria: ['width', '>', 40.5],
  impurityScore: 2.3000000000000003,
  bestSplits: [{ split: ['width', '>', 40.5], score: 2.3000000000000003 }, { split: ['width', '>', 39.5], score: 1.9666666666666668 }, { split: ['width', '>', 30.5], score: 1.5 }],
  dataPartitionsCounts: { false: { no_classes_in_regression_tree: 4 }, true: { no_classes_in_regression_tree: 1 } },
  classCounts: { no_classes_in_regression_tree: 5 },
  regressionTreeAverageOutcome: 1.5,
  depth: 0,
  alreadyUsedSplits: [['width', '>', 40.5]],
  id: 'aa7be949-0f38-4fac-8445-db1bb5157dc9',
  childNodes: {
    false: {
      isLeaf: true, chosenSplitCriteria: ['width', '>', 39.5], impurityScore: 1.4666666666666668, bestSplits: [{ split: ['width', '>', 39.5], score: 1.4666666666666668 }, { split: ['width', '>', 30.5], score: 1.4 }, { split: ['color', '=='], score: 0.30000000000000016 }], dataPartitionsCounts: { true: { no_classes_in_regression_tree: 1 }, false: { no_classes_in_regression_tree: 3 } }, classCounts: { no_classes_in_regression_tree: 4 }, regressionTreeAverageOutcome: 1.525, depth: 1, alreadyUsedSplits: [['width', '>', 40.5], ['width', '>', 39.5]], id: 'a9a21275-a825-4dad-82b6-d8439de4b6c6', parentId: 'aa7be949-0f38-4fac-8445-db1bb5157dc9'
    },
    true: {
      isLeaf: true, chosenSplitCriteria: ['color', '=='], impurityScore: 0, bestSplits: [{ split: ['color', '=='], score: 0 }], dataPartitionsCounts: { black: { no_classes_in_regression_tree: 1 } }, classCounts: { no_classes_in_regression_tree: 1 }, regressionTreeAverageOutcome: 1.4, depth: 1, alreadyUsedSplits: [['width', '>', 40.5], ['color', '==']], id: 'd67a5275-81fe-49ba-9e24-3eeb14132b13', parentId: 'aa7be949-0f38-4fac-8445-db1bb5157dc9'
    }
  }
};
