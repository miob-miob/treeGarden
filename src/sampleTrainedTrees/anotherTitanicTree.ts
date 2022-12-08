/* eslint-disable max-len */
import { TreeGardenNode } from '../treeNode';

/**
 * Another tree trained on titanic data set.
 */
export const titanicTreeTwo = {
  isLeaf: false,
  chosenSplitCriteria: ['sex', '=='],
  impurityScore: 0.3315046989762287,
  bestSplits: [{ split: ['sex', '=='], score: 0.3315046989762287 }, { split: ['pclass', '=='], score: 0.41543876752997844 }, { split: ['fare', '>', 10.825], score: 0.430546900708331 }],
  dataPartitionsCounts: { male: { No: 431, Yes: 100 }, female: { No: 74, Yes: 218 } },
  classCounts: { No: 505, Yes: 318 },
  depth: 0,
  alreadyUsedSplits: [['sex', '==']],
  id: 'fdffa402-68fb-4c29-96f0-46be40b241a2',
  childNodes: {
    male: {
      isLeaf: false,
      chosenSplitCriteria: ['age', '>', 6.5],
      impurityScore: 0.286233334687254,
      bestSplits: [{ split: ['age', '>', 6.5], score: 0.286233334687254 }, { split: ['age', '>', 3.5], score: 0.28799722751330953 }, { split: ['age', '>', 5], score: 0.2883633040470976 }],
      dataPartitionsCounts: { true: { No: 423, Yes: 85 }, false: { Yes: 15, No: 8 } },
      classCounts: { No: 431, Yes: 100 },
      depth: 1,
      alreadyUsedSplits: [['sex', '=='], ['age', '>', 6.5]],
      id: '44d4254d-268c-428a-80a9-5cc6447e099d',
      parentId: 'fdffa402-68fb-4c29-96f0-46be40b241a2',
      childNodes: {
        true: {
          isLeaf: true, chosenSplitCriteria: ['pclass', '=='], impurityScore: 0.25862193362193364, bestSplits: [{ split: ['pclass', '=='], score: 0.25862193362193364 }, { split: ['fare', '>', 26.26875], score: 0.2615266584626393 }, { split: ['fare', '>', 26.125], score: 0.2622184794835428 }], dataPartitionsCounts: { 1: { No: 71, Yes: 39 }, 2: { No: 83, Yes: 7 }, 3: { No: 269, Yes: 39 } }, classCounts: { No: 423, Yes: 85 }, depth: 2, alreadyUsedSplits: [['sex', '=='], ['age', '>', 6.5], ['pclass', '==']], id: 'efd66f07-f25b-4598-b919-80ae3000a3c5', parentId: '44d4254d-268c-428a-80a9-5cc6447e099d'
        },
        false: {
          isLeaf: false,
          chosenSplitCriteria: ['sibsp', '>', 2.5],
          impurityScore: 0.07729468599033816,
          bestSplits: [{ split: ['sibsp', '>', 2.5], score: 0.07729468599033816 }, { split: ['sibsp', '>', 1.5], score: 0.13913043478260861 }, { split: ['sibsp', '>', 3.5], score: 0.22670807453416153 }],
          dataPartitionsCounts: { false: { Yes: 14 }, true: { No: 8, Yes: 1 } },
          classCounts: { Yes: 15, No: 8 },
          depth: 2,
          alreadyUsedSplits: [['sex', '=='], ['age', '>', 6.5], ['sibsp', '>', 2.5]],
          id: 'f1d3b05c-23c6-4f76-9019-7c35575ec101',
          parentId: '44d4254d-268c-428a-80a9-5cc6447e099d',
          childNodes: {
            false: {
              isLeaf: true, chosenSplitCriteria: ['fare', '>', 9.825], impurityScore: 0, bestSplits: [{ split: ['fare', '>', 9.825], score: 0 }, { split: ['fare', '>', 11.80415], score: 0 }, { split: ['fare', '>', 13.4875], score: 0 }], dataPartitionsCounts: { true: { Yes: 13 }, false: { Yes: 1 } }, classCounts: { Yes: 14 }, depth: 3, alreadyUsedSplits: [['sex', '=='], ['age', '>', 6.5], ['sibsp', '>', 2.5], ['fare', '>', 9.825]], id: 'd3b6ad15-eff3-45a4-a539-d4fdb10d0dbb', parentId: 'f1d3b05c-23c6-4f76-9019-7c35575ec101'
            },
            true: {
              isLeaf: true, chosenSplitCriteria: ['fare', '>', 31.331249999999997], impurityScore: 0.16666666666666666, bestSplits: [{ split: ['fare', '>', 31.331249999999997], score: 0.16666666666666666 }, { split: ['age', '>', 2.5], score: 0.16666666666666666 }, { split: ['parch', '>', 1.5], score: 0.16666666666666666 }], dataPartitionsCounts: { false: { No: 5 }, true: { No: 3, Yes: 1 } }, classCounts: { No: 8, Yes: 1 }, depth: 3, alreadyUsedSplits: [['sex', '=='], ['age', '>', 6.5], ['sibsp', '>', 2.5], ['fare', '>', 31.331249999999997]], id: 'a1180457-c2a7-4123-b8be-a5ce2ad207af', parentId: 'f1d3b05c-23c6-4f76-9019-7c35575ec101'
            }
          }
        }
      }
    },
    female: {
      isLeaf: false,
      chosenSplitCriteria: ['pclass', '=='],
      impurityScore: 0.2686870555218204,
      bestSplits: [{ split: ['pclass', '=='], score: 0.2686870555218204 }, { split: ['sibsp', '>', 2.5], score: 0.3384039656570299 }, { split: ['fare', '>', 48.2], score: 0.3409037605491771 }],
      dataPartitionsCounts: { 1: { Yes: 87, No: 1 }, 2: { Yes: 67, No: 6 }, 3: { No: 67, Yes: 64 } },
      classCounts: { No: 74, Yes: 218 },
      depth: 1,
      alreadyUsedSplits: [['sex', '=='], ['pclass', '==']],
      id: 'f44ac853-fab4-4f10-a68f-58a66cacd76a',
      parentId: 'fdffa402-68fb-4c29-96f0-46be40b241a2',
      childNodes: {
        1: {
          isLeaf: true, chosenSplitCriteria: ['fare', '>', 29.35625], impurityScore: 0.018939393939393933, bestSplits: [{ split: ['fare', '>', 29.35625], score: 0.018939393939393933 }, { split: ['fare', '>', 30.5], score: 0.019480519480519484 }, { split: ['fare', '>', 35.2], score: 0.019886363636363636 }], dataPartitionsCounts: { true: { Yes: 82 }, false: { Yes: 5, No: 1 } }, classCounts: { Yes: 87, No: 1 }, depth: 2, alreadyUsedSplits: [['sex', '=='], ['pclass', '=='], ['fare', '>', 29.35625]], id: 'e857e6fb-667b-41ec-a438-1df8ebc477d1', parentId: 'f44ac853-fab4-4f10-a68f-58a66cacd76a'
        },
        2: {
          isLeaf: true, chosenSplitCriteria: ['age', '>', 55.5], impurityScore: 0.12747336377473367, bestSplits: [{ split: ['age', '>', 55.5], score: 0.12747336377473367 }, { split: ['age', '>', 52], score: 0.1410380088751689 }, { split: ['age', '>', 37], score: 0.1436939064714218 }], dataPartitionsCounts: { false: { Yes: 67, No: 5 }, true: { No: 1 } }, classCounts: { Yes: 67, No: 6 }, depth: 2, alreadyUsedSplits: [['sex', '=='], ['pclass', '=='], ['age', '>', 55.5]], id: 'a8aad3c8-e53a-4096-a923-b27c5d6eeee8', parentId: 'f44ac853-fab4-4f10-a68f-58a66cacd76a'
        },
        3: {
          isLeaf: false,
          chosenSplitCriteria: ['fare', '>', 23.35],
          impurityScore: 0.43077482314123533,
          bestSplits: [{ split: ['fare', '>', 23.35], score: 0.43077482314123533 }, { split: ['fare', '>', 23.799999999999997], score: 0.43566757885640217 }, { split: ['fare', '>', 24.808349999999997], score: 0.43591033240168325 }],
          dataPartitionsCounts: { false: { No: 44, Yes: 61 }, true: { No: 23, Yes: 3 } },
          classCounts: { No: 67, Yes: 64 },
          depth: 2,
          alreadyUsedSplits: [['sex', '=='], ['pclass', '=='], ['fare', '>', 23.35]],
          id: 'aa42a24c-60a0-4c50-8a20-398971f3c91c',
          parentId: 'f44ac853-fab4-4f10-a68f-58a66cacd76a',
          childNodes: {
            false: {
              isLeaf: false,
              chosenSplitCriteria: ['fare', '>', 7.8875],
              impurityScore: 0.4570738440303657,
              bestSplits: [{ split: ['fare', '>', 7.8875], score: 0.4570738440303657 }, { split: ['fare', '>', 7.9104], score: 0.4628056628056628 }, { split: ['fare', '>', 7.987500000000001], score: 0.4631897203325775 }],
              dataPartitionsCounts: { true: { No: 35, Yes: 34 }, false: { Yes: 27, No: 9 } },
              classCounts: { No: 44, Yes: 61 },
              depth: 3,
              alreadyUsedSplits: [['sex', '=='], ['pclass', '=='], ['fare', '>', 23.35], ['fare', '>', 7.8875]],
              id: '33b14043-811c-4f10-9677-33e56c1d2355',
              parentId: 'aa42a24c-60a0-4c50-8a20-398971f3c91c',
              childNodes: {
                true: {
                  isLeaf: false,
                  chosenSplitCriteria: ['fare', '>', 15.3729],
                  impurityScore: 0.4527344341766399,
                  bestSplits: [{ split: ['fare', '>', 15.3729], score: 0.4527344341766399 }, { split: ['fare', '>', 14.8729], score: 0.46199650599148645 }, { split: ['fare', '>', 10.825], score: 0.4643982356647763 }],
                  dataPartitionsCounts: { true: { No: 9, Yes: 19 }, false: { No: 26, Yes: 15 } },
                  classCounts: { No: 35, Yes: 34 },
                  depth: 4,
                  alreadyUsedSplits: [['sex', '=='], ['pclass', '=='], ['fare', '>', 23.35], ['fare', '>', 7.8875], ['fare', '>', 15.3729]],
                  id: '96a6180c-0dc6-4ddf-b0cd-c2f752e6e3f1',
                  parentId: '33b14043-811c-4f10-9677-33e56c1d2355',
                  childNodes: {
                    true: {
                      isLeaf: true, chosenSplitCriteria: ['embarked', '=='], impurityScore: 0.37460317460317455, bestSplits: [{ split: ['embarked', '=='], score: 0.37460317460317455 }, { split: ['fare', '>', 17.6], score: 0.38754578754578756 }, { split: ['fare', '>', 17.049999999999997], score: 0.400297619047619 }], dataPartitionsCounts: { S: { No: 8, Yes: 10 }, C: { Yes: 5 }, Q: { Yes: 4, No: 1 } }, classCounts: { No: 9, Yes: 19 }, depth: 5, alreadyUsedSplits: [['sex', '=='], ['pclass', '=='], ['fare', '>', 23.35], ['fare', '>', 7.8875], ['fare', '>', 15.3729], ['embarked', '==']], id: '05a1c850-6c50-497f-8818-9af4129e8dd1', parentId: '96a6180c-0dc6-4ddf-b0cd-c2f752e6e3f1'
                    },
                    false: {
                      isLeaf: false,
                      chosenSplitCriteria: ['fare', '>', 13.4375],
                      impurityScore: 0.40857354028085735,
                      bestSplits: [{ split: ['fare', '>', 13.4375], score: 0.40857354028085735 }, { split: ['fare', '>', 14.4271], score: 0.41841070023603466 }, { split: ['age', '>', 19], score: 0.42486683487524524 }],
                      dataPartitionsCounts: { false: { No: 16, Yes: 14 }, true: { No: 10, Yes: 1 } },
                      classCounts: { No: 26, Yes: 15 },
                      depth: 5,
                      alreadyUsedSplits: [['sex', '=='], ['pclass', '=='], ['fare', '>', 23.35], ['fare', '>', 7.8875], ['fare', '>', 15.3729], ['fare', '>', 13.4375]],
                      id: 'd9c63929-7975-4dba-90fa-7d770abb2b33',
                      parentId: '96a6180c-0dc6-4ddf-b0cd-c2f752e6e3f1',
                      childNodes: {
                        false: {
                          isLeaf: false,
                          chosenSplitCriteria: ['fare', '>', 10.825],
                          impurityScore: 0.3246376811594203,
                          bestSplits: [{ split: ['fare', '>', 10.825], score: 0.3246376811594203 }, { split: ['fare', '>', 10.4896], score: 0.3765151515151515 }, { split: ['age', '>', 19], score: 0.3765151515151515 }],
                          dataPartitionsCounts: { false: { No: 16, Yes: 7 }, true: { Yes: 7 } },
                          classCounts: { No: 16, Yes: 14 },
                          depth: 6,
                          alreadyUsedSplits: [['sex', '=='], ['pclass', '=='], ['fare', '>', 23.35], ['fare', '>', 7.8875], ['fare', '>', 15.3729], ['fare', '>', 13.4375], ['fare', '>', 10.825]],
                          id: 'd61fe854-6b2e-4983-968e-37b0a9054cfb',
                          parentId: 'd9c63929-7975-4dba-90fa-7d770abb2b33',
                          childNodes: {
                            false: {
                              isLeaf: false,
                              chosenSplitCriteria: ['age', '>', 19],
                              impurityScore: 0.3398169336384439,
                              bestSplits: [{ split: ['age', '>', 19], score: 0.3398169336384439 }, { split: ['age', '>', 51.5], score: 0.37944664031620556 }, { split: ['parch', '>', 1.5], score: 0.37944664031620556 }],
                              dataPartitionsCounts: { true: { No: 15, Yes: 4 }, false: { Yes: 3, No: 1 } },
                              classCounts: { No: 16, Yes: 7 },
                              depth: 7,
                              alreadyUsedSplits: [['sex', '=='], ['pclass', '=='], ['fare', '>', 23.35], ['fare', '>', 7.8875], ['fare', '>', 15.3729], ['fare', '>', 13.4375], ['fare', '>', 10.825], ['age', '>', 19]],
                              id: '04aa9ef4-7b72-4c2a-a339-2046a61f78cc',
                              parentId: 'd61fe854-6b2e-4983-968e-37b0a9054cfb',
                              childNodes: {
                                true: {
                                  isLeaf: true, chosenSplitCriteria: ['age', '>', 30.5], impurityScore: 0.2543859649122807, bestSplits: [{ split: ['age', '>', 30.5], score: 0.2543859649122807 }, { split: ['age', '>', 51.5], score: 0.263157894736842 }, { split: ['age', '>', 25.5], score: 0.2679425837320574 }], dataPartitionsCounts: { false: { No: 14, Yes: 2 }, true: { Yes: 2, No: 1 } }, classCounts: { No: 15, Yes: 4 }, depth: 8, alreadyUsedSplits: [['sex', '=='], ['pclass', '=='], ['fare', '>', 23.35], ['fare', '>', 7.8875], ['fare', '>', 15.3729], ['fare', '>', 13.4375], ['fare', '>', 10.825], ['age', '>', 19], ['age', '>', 30.5]], id: '3d2ef3e4-5429-49cb-8f3b-97a272775110', parentId: '04aa9ef4-7b72-4c2a-a339-2046a61f78cc'
                                },
                                false: {
                                  isLeaf: true, chosenSplitCriteria: ['fare', '>', 10.1521], impurityScore: 0, bestSplits: [{ split: ['fare', '>', 10.1521], score: 0 }, { split: ['age', '>', 9.5], score: 0 }, { split: ['fare', '>', 9.595849999999999], score: 0.25 }], dataPartitionsCounts: { false: { Yes: 3 }, true: { No: 1 } }, classCounts: { Yes: 3, No: 1 }, depth: 8, alreadyUsedSplits: [['sex', '=='], ['pclass', '=='], ['fare', '>', 23.35], ['fare', '>', 7.8875], ['fare', '>', 15.3729], ['fare', '>', 13.4375], ['fare', '>', 10.825], ['age', '>', 19], ['fare', '>', 10.1521]], id: 'c414aba4-9a5f-4023-9014-e738180c9734', parentId: '04aa9ef4-7b72-4c2a-a339-2046a61f78cc'
                                }
                              }
                            },
                            true: {
                              isLeaf: true, chosenSplitCriteria: ['fare', '>', 11.1875], impurityScore: 0, bestSplits: [{ split: ['fare', '>', 11.1875], score: 0 }, { split: ['fare', '>', 11.7646], score: 0 }, { split: ['fare', '>', 12.38125], score: 0 }], dataPartitionsCounts: { false: { Yes: 2 }, true: { Yes: 5 } }, classCounts: { Yes: 7 }, depth: 7, alreadyUsedSplits: [['sex', '=='], ['pclass', '=='], ['fare', '>', 23.35], ['fare', '>', 7.8875], ['fare', '>', 15.3729], ['fare', '>', 13.4375], ['fare', '>', 10.825], ['fare', '>', 11.1875]], id: '35970bbc-e0ae-4a1c-afc0-028287e741f0', parentId: 'd61fe854-6b2e-4983-968e-37b0a9054cfb'
                            }
                          }
                        },
                        true: {
                          isLeaf: true, chosenSplitCriteria: ['parch', '>', 1.5], impurityScore: 0.09090909090909091, bestSplits: [{ split: ['parch', '>', 1.5], score: 0.09090909090909091 }, { split: ['fare', '>', 14.8729], score: 0.1212121212121212 }, { split: ['age', '>', 28.5], score: 0.1212121212121212 }], dataPartitionsCounts: { false: { No: 9 }, true: { No: 1, Yes: 1 } }, classCounts: { No: 10, Yes: 1 }, depth: 6, alreadyUsedSplits: [['sex', '=='], ['pclass', '=='], ['fare', '>', 23.35], ['fare', '>', 7.8875], ['fare', '>', 15.3729], ['fare', '>', 13.4375], ['parch', '>', 1.5]], id: 'c863ce1d-d47f-4687-a7ed-5ce4a6c0c464', parentId: 'd9c63929-7975-4dba-90fa-7d770abb2b33'
                        }
                      }
                    }
                  }
                },
                false: {
                  isLeaf: false,
                  chosenSplitCriteria: ['age', '>', 29.25],
                  impurityScore: 0.3088235294117647,
                  bestSplits: [{ split: ['age', '>', 29.25], score: 0.3088235294117647 }, { split: ['age', '>', 37.75], score: 0.34285714285714286 }, { split: ['parch', '>', 1], score: 0.34285714285714286 }],
                  dataPartitionsCounts: { false: { Yes: 27, No: 7 }, true: { No: 2 } },
                  classCounts: { Yes: 27, No: 9 },
                  depth: 4,
                  alreadyUsedSplits: [['sex', '=='], ['pclass', '=='], ['fare', '>', 23.35], ['fare', '>', 7.8875], ['age', '>', 29.25]],
                  id: 'f6a54c04-6824-4363-9977-30372e9939af',
                  parentId: '33b14043-811c-4f10-9677-33e56c1d2355',
                  childNodes: {
                    false: {
                      isLeaf: true, chosenSplitCriteria: ['parch', '>', 1], impurityScore: 0.2887700534759357, bestSplits: [{ split: ['parch', '>', 1], score: 0.2887700534759357 }, { split: ['fare', '>', 7.78125], score: 0.3050108932461874 }, { split: ['fare', '>', 7.80835], score: 0.3088235294117647 }], dataPartitionsCounts: { false: { Yes: 27, No: 6 }, true: { No: 1 } }, classCounts: { Yes: 27, No: 7 }, depth: 5, alreadyUsedSplits: [['sex', '=='], ['pclass', '=='], ['fare', '>', 23.35], ['fare', '>', 7.8875], ['age', '>', 29.25], ['parch', '>', 1]], id: 'ede0ffba-6aa1-40a4-a3da-dec163993dc1', parentId: 'f6a54c04-6824-4363-9977-30372e9939af'
                    },
                    true: {
                      isLeaf: true, chosenSplitCriteria: ['embarked', '=='], impurityScore: 0, bestSplits: [{ split: ['embarked', '=='], score: 0 }, { split: ['age', '>', 37.75], score: 0 }], dataPartitionsCounts: { Q: { No: 1 }, S: { No: 1 } }, classCounts: { No: 2 }, depth: 5, alreadyUsedSplits: [['sex', '=='], ['pclass', '=='], ['fare', '>', 23.35], ['fare', '>', 7.8875], ['age', '>', 29.25], ['embarked', '==']], id: '9766cf99-bf26-4bbf-b44d-b8fb1edd341e', parentId: 'f6a54c04-6824-4363-9977-30372e9939af'
                    }
                  }
                }
              }
            },
            true: {
              isLeaf: true, chosenSplitCriteria: ['embarked', '=='], impurityScore: 0.14153846153846153, bestSplits: [{ split: ['embarked', '=='], score: 0.14153846153846153 }, { split: ['parch', '>', 0.5], score: 0.14153846153846153 }, { split: ['fare', '>', 32.88125], score: 0.1900452488687783 }], dataPartitionsCounts: { S: { No: 23, Yes: 2 }, Q: { Yes: 1 } }, classCounts: { No: 23, Yes: 3 }, depth: 3, alreadyUsedSplits: [['sex', '=='], ['pclass', '=='], ['fare', '>', 23.35], ['embarked', '==']], id: '89f38959-c29f-453a-8a9a-af29cdd5be47', parentId: 'aa42a24c-60a0-4c50-8a20-398971f3c91c'
            }
          }
        }
      }
    }
  }
} as TreeGardenNode;
