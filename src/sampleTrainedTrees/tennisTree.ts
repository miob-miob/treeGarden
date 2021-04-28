/* eslint-disable max-len */

// learned with: {
//   impurityScoringForSplit: getGiniIndexForSplit,
//   biggerImpurityScoreBetterSplit: false
// }

export const tennisTree = {
  isLeaf: false,
  chosenSplitCriteria: ['outlook', '=='],
  impurityScore: 0.34285714285714286,
  bestSplits: [{ split: ['outlook', '=='], score: 0.34285714285714286 }, { split: ['humidity', '=='], score: 0.3673469387755103 }, { split: ['wind', '=='], score: 0.42857142857142855 }],
  dataPartitionsCounts: { Sunny: { No: 3, Yes: 2 }, Overcast: { Yes: 4 }, Rain: { Yes: 3, No: 2 } },
  classCounts: { No: 5, Yes: 9 },
  depth: 0,
  alreadyUsedSplits: [['outlook', '==']],
  id: '05b1afca-a275-4b47-864d-82b3f664a457',
  childNodes: {
    Sunny: {
      isLeaf: false,
      chosenSplitCriteria: ['humidity', '=='],
      impurityScore: 0,
      bestSplits: [{ split: ['humidity', '=='], score: 0 }, { split: ['temp', '=='], score: 0.2 }, { split: ['wind', '=='], score: 0.4666666666666667 }],
      dataPartitionsCounts: { High: { No: 3 }, Normal: { Yes: 2 } },
      classCounts: { No: 3, Yes: 2 },
      depth: 1,
      alreadyUsedSplits: [['outlook', '=='], ['humidity', '==']],
      id: '084ba35c-f546-4ff7-8f4d-348ac78150ed',
      childNodes: {
        High: {
          isLeaf: true, chosenSplitCriteria: ['temp', '=='], impurityScore: 0, bestSplits: [{ split: ['temp', '=='], score: 0 }, { split: ['wind', '=='], score: 0 }], dataPartitionsCounts: { Hot: { No: 2 }, Mild: { No: 1 } }, classCounts: { No: 3 }, depth: 2, alreadyUsedSplits: [['outlook', '=='], ['humidity', '=='], ['temp', '==']], id: 'd4e3c8ca-dd95-451a-8559-563b5f7fbc04'
        },
        Normal: {
          isLeaf: true, chosenSplitCriteria: ['temp', '=='], impurityScore: 0, bestSplits: [{ split: ['temp', '=='], score: 0 }, { split: ['wind', '=='], score: 0 }], dataPartitionsCounts: { Cool: { Yes: 1 }, Mild: { Yes: 1 } }, classCounts: { Yes: 2 }, depth: 2, alreadyUsedSplits: [['outlook', '=='], ['humidity', '=='], ['temp', '==']], id: 'a4a00394-61a7-453a-a43c-c9cd923bca3d'
        }
      }
    },
    Overcast: {
      isLeaf: true, chosenSplitCriteria: ['temp', '=='], impurityScore: 0, bestSplits: [{ split: ['temp', '=='], score: 0 }, { split: ['humidity', '=='], score: 0 }, { split: ['wind', '=='], score: 0 }], dataPartitionsCounts: { Hot: { Yes: 2 }, Cool: { Yes: 1 }, Mild: { Yes: 1 } }, classCounts: { Yes: 4 }, depth: 1, alreadyUsedSplits: [['outlook', '=='], ['temp', '==']], id: '767c1a6b-e181-4060-85cb-015805ac73df'
    },
    Rain: {
      isLeaf: false,
      chosenSplitCriteria: ['wind', '=='],
      impurityScore: 0,
      bestSplits: [{ split: ['wind', '=='], score: 0 }, { split: ['temp', '=='], score: 0.4666666666666667 }, { split: ['humidity', '=='], score: 0.4666666666666667 }],
      dataPartitionsCounts: { Weak: { Yes: 3 }, Strong: { No: 2 } },
      classCounts: { Yes: 3, No: 2 },
      depth: 1,
      alreadyUsedSplits: [['outlook', '=='], ['wind', '==']],
      id: 'b7219341-5932-4ed8-a7c6-9c93b2a3095f',
      childNodes: {
        Weak: {
          isLeaf: true, chosenSplitCriteria: ['temp', '=='], impurityScore: 0, bestSplits: [{ split: ['temp', '=='], score: 0 }, { split: ['humidity', '=='], score: 0 }], dataPartitionsCounts: { Mild: { Yes: 2 }, Cool: { Yes: 1 } }, classCounts: { Yes: 3 }, depth: 2, alreadyUsedSplits: [['outlook', '=='], ['wind', '=='], ['temp', '==']], id: 'dd9e0dc4-c1c2-47df-8432-52588cee9aea'
        },
        Strong: {
          isLeaf: true, chosenSplitCriteria: ['temp', '=='], impurityScore: 0, bestSplits: [{ split: ['temp', '=='], score: 0 }, { split: ['humidity', '=='], score: 0 }], dataPartitionsCounts: { Cool: { No: 1 }, Mild: { No: 1 } }, classCounts: { No: 2 }, depth: 2, alreadyUsedSplits: [['outlook', '=='], ['wind', '=='], ['temp', '==']], id: 'bf8bce50-d65a-4dc2-a383-b2d95df57da4'
        }
      }
    }
  }
};

