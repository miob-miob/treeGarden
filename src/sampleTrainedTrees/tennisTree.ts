/* eslint-disable max-len */

// learned with: {
//   impurityScoringForSplit: getGiniIndexForSplit,
//   biggerImpurityScoreBetterSplit: false
// }

import { TreeGardenNode } from '../treeNode';

/**
 * Tree trained on tennis data set
 */
export const tennisTree = {
  isLeaf: false,
  chosenSplitCriteria: ['outlook', '=='],
  impurityScore: 0.34285714285714286,
  bestSplits: [{ split: ['outlook', '=='], score: 0.34285714285714286 }, { split: ['humidity', '=='], score: 0.3673469387755103 }, { split: ['wind', '=='], score: 0.42857142857142855 }],
  dataPartitionsCounts: { Sunny: { No: 3, Yes: 2 }, Overcast: { Yes: 4 }, Rain: { Yes: 3, No: 2 } },
  classCounts: { No: 5, Yes: 9 },
  depth: 0,
  alreadyUsedSplits: [['outlook', '==']],
  id: 'f2f856dc-c656-4689-b32a-a4b3a4c3aaab',
  childNodes: {
    Sunny: {
      isLeaf: false,
      chosenSplitCriteria: ['humidity', '=='],
      impurityScore: 0,
      bestSplits: [{ split: ['humidity', '=='], score: 0 }, { split: ['temp', '=='], score: 0.2 }, { split: ['wind', '=='], score: 0.4666666666666667 }],
      dataPartitionsCounts: { High: { No: 3 }, Normal: { Yes: 2 } },
      classCounts: { No: 3, Yes: 2 },
      depth: 1,
      parentId: 'f2f856dc-c656-4689-b32a-a4b3a4c3aaab',
      alreadyUsedSplits: [['outlook', '=='], ['humidity', '==']],
      id: 'c4402f7c-f227-48ab-8040-a703dd34e7ab',
      childNodes: {
        High: {
          isLeaf: true, chosenSplitCriteria: ['temp', '=='], impurityScore: 0, bestSplits: [{ split: ['temp', '=='], score: 0 }, { split: ['wind', '=='], score: 0 }], dataPartitionsCounts: { Hot: { No: 2 }, Mild: { No: 1 } }, classCounts: { No: 3 }, depth: 2, parentId: 'c4402f7c-f227-48ab-8040-a703dd34e7ab', alreadyUsedSplits: [['outlook', '=='], ['humidity', '=='], ['temp', '==']], id: '9f156fc0-3f82-4a31-863e-108bfb37fc60'
        },
        Normal: {
          isLeaf: true, chosenSplitCriteria: ['temp', '=='], impurityScore: 0, bestSplits: [{ split: ['temp', '=='], score: 0 }, { split: ['wind', '=='], score: 0 }], dataPartitionsCounts: { Cool: { Yes: 1 }, Mild: { Yes: 1 } }, classCounts: { Yes: 2 }, depth: 2, parentId: 'c4402f7c-f227-48ab-8040-a703dd34e7ab', alreadyUsedSplits: [['outlook', '=='], ['humidity', '=='], ['temp', '==']], id: '8bbace58-e339-4e42-a5a0-5bab22b62724'
        }
      }
    },
    Overcast: {
      isLeaf: true, chosenSplitCriteria: ['temp', '=='], impurityScore: 0, bestSplits: [{ split: ['temp', '=='], score: 0 }, { split: ['humidity', '=='], score: 0 }, { split: ['wind', '=='], score: 0 }], dataPartitionsCounts: { Hot: { Yes: 2 }, Cool: { Yes: 1 }, Mild: { Yes: 1 } }, classCounts: { Yes: 4 }, depth: 1, parentId: 'f2f856dc-c656-4689-b32a-a4b3a4c3aaab', alreadyUsedSplits: [['outlook', '=='], ['temp', '==']], id: '1aca91e4-8d1c-431a-8466-8181ef547f72'
    },
    Rain: {
      isLeaf: false,
      chosenSplitCriteria: ['wind', '=='],
      impurityScore: 0,
      bestSplits: [{ split: ['wind', '=='], score: 0 }, { split: ['temp', '=='], score: 0.4666666666666667 }, { split: ['humidity', '=='], score: 0.4666666666666667 }],
      dataPartitionsCounts: { Weak: { Yes: 3 }, Strong: { No: 2 } },
      classCounts: { Yes: 3, No: 2 },
      depth: 1,
      parentId: 'f2f856dc-c656-4689-b32a-a4b3a4c3aaab',
      alreadyUsedSplits: [['outlook', '=='], ['wind', '==']],
      id: '8e64ed62-643a-444b-a03d-b1a215121376',
      childNodes: {
        Weak: {
          isLeaf: true, chosenSplitCriteria: ['temp', '=='], impurityScore: 0, bestSplits: [{ split: ['temp', '=='], score: 0 }, { split: ['humidity', '=='], score: 0 }], dataPartitionsCounts: { Mild: { Yes: 2 }, Cool: { Yes: 1 } }, classCounts: { Yes: 3 }, depth: 2, parentId: '8e64ed62-643a-444b-a03d-b1a215121376', alreadyUsedSplits: [['outlook', '=='], ['wind', '=='], ['temp', '==']], id: 'ecd8f049-40a9-4d2d-bb97-3b0bf37ae5c8'
        },
        Strong: {
          isLeaf: true, chosenSplitCriteria: ['temp', '=='], impurityScore: 0, bestSplits: [{ split: ['temp', '=='], score: 0 }, { split: ['humidity', '=='], score: 0 }], dataPartitionsCounts: { Cool: { No: 1 }, Mild: { No: 1 } }, classCounts: { No: 2 }, depth: 2, parentId: '8e64ed62-643a-444b-a03d-b1a215121376', alreadyUsedSplits: [['outlook', '=='], ['wind', '=='], ['temp', '==']], id: 'dc881780-2267-44a7-b978-6b21d23d6460'
        }
      }
    }
  }
} as TreeGardenNode;
