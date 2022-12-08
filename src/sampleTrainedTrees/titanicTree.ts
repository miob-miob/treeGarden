/* eslint-disable max-len */

// 38 nodes with accuracy 0.8571428571428571


import { TreeGardenNode } from '../treeNode';

/**
 * Tree trained on titanic data set
 */
export const titanicTree = {
  isLeaf: false,
  chosenSplitCriteria: ['sex', '=='],
  impurityScore: 0.3346032562386543,
  bestSplits: [{ split: ['sex', '=='], score: 0.3346032562386543 }, { split: ['pclass', '>', 2.5], score: 0.43774340524925254 }, { split: ['fare', '>', 52.277100000000004], score: 0.4421965806045294 }],
  dataPartitionsCounts: { male: { No: 286, Yes: 69 }, female: { No: 51, Yes: 156 } },
  classCounts: { No: 337, Yes: 225 },
  depth: 0,
  alreadyUsedSplits: [['sex', '==']],
  id: 'c7dc288c-688c-454d-8533-e3594b3bf602',
  childNodes: {
    male: {
      isLeaf: false,
      chosenSplitCriteria: ['age', '>', 9.5],
      impurityScore: 0.28685625762931216,
      bestSplits: [{ split: ['age', '>', 9.5], score: 0.28685625762931216 }, { split: ['age', '>', 13], score: 0.287362394404648 }, { split: ['age', '>', 10.5], score: 0.28934676307100765 }],
      dataPartitionsCounts: { true: { No: 281, Yes: 57 }, false: { Yes: 12, No: 5 } },
      classCounts: { No: 286, Yes: 69 },
      depth: 1,
      alreadyUsedSplits: [['sex', '=='], ['age', '>', 9.5]],
      id: '4c16cf81-ab5e-48aa-89cc-4be8007970a2',
      parentId: 'c7dc288c-688c-454d-8533-e3594b3bf602',
      childNodes: {
        true: {
          isLeaf: true, chosenSplitCriteria: ['embarked', '=='], impurityScore: 0.2645785449981254, bestSplits: [{ split: ['embarked', '=='], score: 0.2645785449981254 }, { split: ['pclass', '>', 1.5], score: 0.26469001931514097 }, { split: ['fare', '>', 26.26875], score: 0.2658049169969998 }], dataPartitionsCounts: { S: { No: 211, Yes: 31 }, Q: { No: 27, Yes: 3 }, C: { No: 43, Yes: 23 } }, classCounts: { No: 281, Yes: 57 }, depth: 2, alreadyUsedSplits: [['sex', '=='], ['age', '>', 9.5], ['embarked', '==']], id: 'f37b1e87-c2c9-4313-984f-dd6ea34ad1c3', parentId: '4c16cf81-ab5e-48aa-89cc-4be8007970a2'
        },
        false: {
          isLeaf: false,
          chosenSplitCriteria: ['sibsp', '>', 2],
          impurityScore: 0.09803921568627448,
          bestSplits: [{ split: ['sibsp', '>', 2], score: 0.09803921568627448 }, { split: ['sibsp', '>', 3.5], score: 0.2873303167420814 }, { split: ['pclass', '>', 2.5], score: 0.29411764705882354 }],
          dataPartitionsCounts: { false: { Yes: 11 }, true: { No: 5, Yes: 1 } },
          classCounts: { Yes: 12, No: 5 },
          depth: 2,
          alreadyUsedSplits: [['sex', '=='], ['age', '>', 9.5], ['sibsp', '>', 2]],
          id: '4eaa44df-6cff-465a-9acf-ffb4055183df',
          parentId: '4c16cf81-ab5e-48aa-89cc-4be8007970a2',
          childNodes: {
            false: {
              isLeaf: true, chosenSplitCriteria: ['fare', '>', 9.825], impurityScore: 0, bestSplits: [{ split: ['fare', '>', 9.825], score: 0 }, { split: ['fare', '>', 13.51665], score: 0 }, { split: ['fare', '>', 17.325], score: 0 }], dataPartitionsCounts: { true: { Yes: 10 }, false: { Yes: 1 } }, classCounts: { Yes: 11 }, depth: 3, alreadyUsedSplits: [['sex', '=='], ['age', '>', 9.5], ['sibsp', '>', 2], ['fare', '>', 9.825]], id: '94e72cae-13ea-42f8-aaf8-fc3d0fd7f4cf', parentId: '4eaa44df-6cff-465a-9acf-ffb4055183df'
            },
            true: {
              isLeaf: true, chosenSplitCriteria: ['fare', '>', 31.331249999999997], impurityScore: 0.2222222222222222, bestSplits: [{ split: ['fare', '>', 31.331249999999997], score: 0.2222222222222222 }, { split: ['age', '>', 3.5], score: 0.2222222222222222 }, { split: ['fare', '>', 29.5875], score: 0.25 }], dataPartitionsCounts: { true: { No: 2, Yes: 1 }, false: { No: 3 } }, classCounts: { No: 5, Yes: 1 }, depth: 3, alreadyUsedSplits: [['sex', '=='], ['age', '>', 9.5], ['sibsp', '>', 2], ['fare', '>', 31.331249999999997]], id: 'fc60e7d4-21a0-4f51-8d6b-7fe51840c008', parentId: '4eaa44df-6cff-465a-9acf-ffb4055183df'
            }
          }
        }
      }
    },
    female: {
      isLeaf: false,
      chosenSplitCriteria: ['pclass', '>', 2.5],
      impurityScore: 0.2797902829278893,
      bestSplits: [{ split: ['pclass', '>', 2.5], score: 0.2797902829278893 }, { split: ['pclass', '>', 1.5], score: 0.3252173913043478 }, { split: ['fare', '>', 48.2], score: 0.3394320782192635 }],
      dataPartitionsCounts: { true: { No: 46, Yes: 51 }, false: { Yes: 105, No: 5 } },
      classCounts: { No: 51, Yes: 156 },
      depth: 1,
      alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5]],
      id: '73408045-08c7-4d6c-ae98-089ab0f37f4e',
      parentId: 'c7dc288c-688c-454d-8533-e3594b3bf602',
      childNodes: {
        true: {
          isLeaf: false,
          chosenSplitCriteria: ['fare', '>', 23.25415],
          impurityScore: 0.4278805336567616,
          bestSplits: [{ split: ['fare', '>', 23.25415], score: 0.4278805336567616 }, { split: ['fare', '>', 24.808349999999997], score: 0.4290327732136202 }, { split: ['fare', '>', 20.799999999999997], score: 0.42926585442049353 }],
          dataPartitionsCounts: { false: { No: 31, Yes: 49 }, true: { No: 15, Yes: 2 } },
          classCounts: { No: 46, Yes: 51 },
          depth: 2,
          alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415]],
          id: '7d0038fe-b325-4989-9720-92d8ba939d77',
          parentId: '73408045-08c7-4d6c-ae98-089ab0f37f4e',
          childNodes: {
            false: {
              isLeaf: false,
              chosenSplitCriteria: ['fare', '>', 7.5896],
              impurityScore: 0.4503378378378379,
              bestSplits: [{ split: ['fare', '>', 7.5896], score: 0.4503378378378379 }, { split: ['age', '>', 36.5], score: 0.45199999999999996 }, { split: ['age', '>', 28.5], score: 0.4538461538461539 }],
              dataPartitionsCounts: { true: { No: 31, Yes: 43 }, false: { Yes: 6 } },
              classCounts: { No: 31, Yes: 49 },
              depth: 3,
              alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896]],
              id: 'a712aaf7-389f-4b72-a2e3-f2dfab6d9642',
              parentId: '7d0038fe-b325-4989-9720-92d8ba939d77',
              childNodes: {
                true: {
                  isLeaf: false,
                  chosenSplitCriteria: ['age', '>', 36.5],
                  impurityScore: 0.46580493537015266,
                  bestSplits: [{ split: ['age', '>', 36.5], score: 0.46580493537015266 }, { split: ['age', '>', 28.5], score: 0.4701786532295007 }, { split: ['embarked', '=='], score: 0.4707304707304708 }],
                  dataPartitionsCounts: { false: { No: 27, Yes: 42 }, true: { No: 4, Yes: 1 } },
                  classCounts: { No: 31, Yes: 43 },
                  depth: 4,
                  alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5]],
                  id: '10fd7e20-1018-4a43-9cbf-871a699f5990',
                  parentId: 'a712aaf7-389f-4b72-a2e3-f2dfab6d9642',
                  childNodes: {
                    false: {
                      isLeaf: false,
                      chosenSplitCriteria: ['fare', '>', 7.6396],
                      impurityScore: 0.46547314578005117,
                      bestSplits: [{ split: ['fare', '>', 7.6396], score: 0.46547314578005117 }, { split: ['parch', '>', 3], score: 0.46547314578005117 }, { split: ['embarked', '=='], score: 0.46552795031055905 }],
                      dataPartitionsCounts: { true: { No: 26, Yes: 42 }, false: { No: 1 } },
                      classCounts: { No: 27, Yes: 42 },
                      depth: 5,
                      alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396]],
                      id: '42218b94-5a0a-4a59-ab92-b157f4c05430',
                      parentId: '10fd7e20-1018-4a43-9cbf-871a699f5990',
                      childNodes: {
                        true: {
                          isLeaf: false,
                          chosenSplitCriteria: ['embarked', '=='],
                          impurityScore: 0.4566176470588236,
                          bestSplits: [{ split: ['embarked', '=='], score: 0.4566176470588236 }, { split: ['parch', '>', 3], score: 0.46093064091308156 }, { split: ['age', '>', 6.5], score: 0.4633143580012649 }],
                          dataPartitionsCounts: { S: { No: 17, Yes: 23 }, Q: { Yes: 15, No: 5 }, C: { No: 4, Yes: 4 } },
                          classCounts: { No: 26, Yes: 42 },
                          depth: 6,
                          alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '==']],
                          id: '1edfb239-24a7-4ab9-a6c6-ccf29b18c709',
                          parentId: '42218b94-5a0a-4a59-ab92-b157f4c05430',
                          childNodes: {
                            S: {
                              isLeaf: false,
                              chosenSplitCriteria: ['fare', '>', 10.825],
                              impurityScore: 0.4413533834586467,
                              bestSplits: [{ split: ['fare', '>', 10.825], score: 0.4413533834586467 }, { split: ['fare', '>', 10.4896], score: 0.45749999999999996 }, { split: ['fare', '>', 9.83335], score: 0.46085858585858586 }],
                              dataPartitionsCounts: { true: { No: 5, Yes: 14 }, false: { No: 12, Yes: 9 } },
                              classCounts: { No: 17, Yes: 23 },
                              depth: 7,
                              alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['fare', '>', 10.825]],
                              id: '488bd392-b48d-468d-b49c-c63c17a7a85d',
                              parentId: '1edfb239-24a7-4ab9-a6c6-ccf29b18c709',
                              childNodes: {
                                true: {
                                  isLeaf: true, chosenSplitCriteria: ['fare', '>', 17.6], impurityScore: 0.23751686909581635, bestSplits: [{ split: ['fare', '>', 17.6], score: 0.23751686909581635 }, { split: ['fare', '>', 20.799999999999997], score: 0.26140350877192975 }, { split: ['fare', '>', 17.049999999999997], score: 0.2769423558897244 }], dataPartitionsCounts: { true: { No: 4, Yes: 2 }, false: { Yes: 12, No: 1 } }, classCounts: { No: 5, Yes: 14 }, depth: 8, alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['fare', '>', 10.825], ['fare', '>', 17.6]], id: 'b57a198e-ecb9-45d4-a138-6eb4ea14b57c', parentId: '488bd392-b48d-468d-b49c-c63c17a7a85d'
                                },
                                false: {
                                  isLeaf: false,
                                  chosenSplitCriteria: ['fare', '>', 7.7625],
                                  impurityScore: 0.42105263157894735,
                                  bestSplits: [{ split: ['fare', '>', 7.7625], score: 0.42105263157894735 }, { split: ['fare', '>', 7.987500000000001], score: 0.4259259259259259 }, { split: ['age', '>', 27], score: 0.43492063492063493 }],
                                  dataPartitionsCounts: { true: { No: 12, Yes: 7 }, false: { Yes: 2 } },
                                  classCounts: { No: 12, Yes: 9 },
                                  depth: 8,
                                  alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['fare', '>', 10.825], ['fare', '>', 7.7625]],
                                  id: 'cabc5bbb-47a9-460b-8890-2152f06f990e',
                                  parentId: '488bd392-b48d-468d-b49c-c63c17a7a85d',
                                  childNodes: {
                                    true: {
                                      isLeaf: false,
                                      chosenSplitCriteria: ['parch', '>', 1.5],
                                      impurityScore: 0.42105263157894735,
                                      bestSplits: [{ split: ['parch', '>', 1.5], score: 0.42105263157894735 }, { split: ['sibsp', '>', 2.5], score: 0.42105263157894735 }, { split: ['fare', '>', 7.987500000000001], score: 0.4269005847953216 }],
                                      dataPartitionsCounts: { false: { No: 12, Yes: 6 }, true: { Yes: 1 } },
                                      classCounts: { No: 12, Yes: 7 },
                                      depth: 9,
                                      alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['fare', '>', 10.825], ['fare', '>', 7.7625], ['parch', '>', 1.5]],
                                      id: 'ade97a56-21df-4676-8c1c-5425cccc0241',
                                      parentId: 'cabc5bbb-47a9-460b-8890-2152f06f990e',
                                      childNodes: {
                                        false: {
                                          isLeaf: false,
                                          chosenSplitCriteria: ['age', '>', 27],
                                          impurityScore: 0.4166666666666666,
                                          bestSplits: [{ split: ['age', '>', 27], score: 0.4166666666666666 }, { split: ['fare', '>', 10.1521], score: 0.41666666666666663 }, { split: ['fare', '>', 7.987500000000001], score: 0.41975308641975306 }],
                                          dataPartitionsCounts: { true: { No: 5, Yes: 1 }, false: { No: 7, Yes: 5 } },
                                          classCounts: { No: 12, Yes: 6 },
                                          depth: 10,
                                          alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['fare', '>', 10.825], ['fare', '>', 7.7625], ['parch', '>', 1.5], ['age', '>', 27]],
                                          id: '7682c7a0-bc2b-4ccc-9598-b4e94295ac15',
                                          parentId: 'ade97a56-21df-4676-8c1c-5425cccc0241',
                                          childNodes: {
                                            true: {
                                              isLeaf: true, chosenSplitCriteria: ['fare', '>', 8.36665], impurityScore: 0.16666666666666666, bestSplits: [{ split: ['fare', '>', 8.36665], score: 0.16666666666666666 }, { split: ['age', '>', 30], score: 0.16666666666666666 }, { split: ['age', '>', 28.5], score: 0.2222222222222222 }], dataPartitionsCounts: { false: { No: 4 }, true: { Yes: 1, No: 1 } }, classCounts: { No: 5, Yes: 1 }, depth: 11, alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['fare', '>', 10.825], ['fare', '>', 7.7625], ['parch', '>', 1.5], ['age', '>', 27], ['fare', '>', 8.36665]], id: '8d60a72b-ff7b-4c9c-95f5-212783741add', parentId: '7682c7a0-bc2b-4ccc-9598-b4e94295ac15'
                                            },
                                            false: {
                                              isLeaf: false,
                                              chosenSplitCriteria: ['age', '>', 25.5],
                                              impurityScore: 0.35000000000000003,
                                              bestSplits: [{ split: ['age', '>', 25.5], score: 0.35000000000000003 }, { split: ['fare', '>', 8.29375], score: 0.4190476190476191 }, { split: ['age', '>', 21.5], score: 0.4380952380952381 }],
                                              dataPartitionsCounts: { false: { No: 7, Yes: 3 }, true: { Yes: 2 } },
                                              classCounts: { No: 7, Yes: 5 },
                                              depth: 11,
                                              alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['fare', '>', 10.825], ['fare', '>', 7.7625], ['parch', '>', 1.5], ['age', '>', 27], ['age', '>', 25.5]],
                                              id: 'bef4a380-ac90-4010-971b-ff012c6a3807',
                                              parentId: '7682c7a0-bc2b-4ccc-9598-b4e94295ac15',
                                              childNodes: {
                                                false: {
                                                  isLeaf: false,
                                                  chosenSplitCriteria: ['age', '>', 19.5],
                                                  impurityScore: 0.3666666666666666,
                                                  bestSplits: [{ split: ['age', '>', 19.5], score: 0.3666666666666666 }, { split: ['fare', '>', 8.25835], score: 0.3999999999999999 }, { split: ['fare', '>', 10.1792], score: 0.39999999999999997 }],
                                                  dataPartitionsCounts: { true: { No: 5, Yes: 1 }, false: { No: 2, Yes: 2 } },
                                                  classCounts: { No: 7, Yes: 3 },
                                                  depth: 12,
                                                  alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['fare', '>', 10.825], ['fare', '>', 7.7625], ['parch', '>', 1.5], ['age', '>', 27], ['age', '>', 25.5], ['age', '>', 19.5]],
                                                  id: '324b3b2e-d287-4e2d-aa8b-14c9dbeb4393',
                                                  parentId: 'bef4a380-ac90-4010-971b-ff012c6a3807',
                                                  childNodes: {
                                                    true: {
                                                      isLeaf: true, chosenSplitCriteria: ['fare', '>', 8.21875], impurityScore: 0.16666666666666666, bestSplits: [{ split: ['fare', '>', 8.21875], score: 0.16666666666666666 }, { split: ['fare', '>', 9.243749999999999], score: 0.2222222222222222 }, { split: ['age', '>', 21.5], score: 0.2222222222222222 }], dataPartitionsCounts: { true: { No: 4 }, false: { Yes: 1, No: 1 } }, classCounts: { No: 5, Yes: 1 }, depth: 13, alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['fare', '>', 10.825], ['fare', '>', 7.7625], ['parch', '>', 1.5], ['age', '>', 27], ['age', '>', 25.5], ['age', '>', 19.5], ['fare', '>', 8.21875]], id: 'f6c5a64b-db05-4275-8f95-74bb5db3ec14', parentId: '324b3b2e-d287-4e2d-aa8b-14c9dbeb4393'
                                                    },
                                                    false: {
                                                      isLeaf: false,
                                                      chosenSplitCriteria: ['fare', '>', 7.8146],
                                                      impurityScore: 0.3333333333333333,
                                                      bestSplits: [{ split: ['fare', '>', 7.8146], score: 0.3333333333333333 }, { split: ['fare', '>', 8.84795], score: 0.3333333333333333 }, { split: ['age', '>', 16], score: 0.3333333333333333 }],
                                                      dataPartitionsCounts: { true: { No: 1, Yes: 2 }, false: { No: 1 } },
                                                      classCounts: { No: 2, Yes: 2 },
                                                      depth: 13,
                                                      alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['fare', '>', 10.825], ['fare', '>', 7.7625], ['parch', '>', 1.5], ['age', '>', 27], ['age', '>', 25.5], ['age', '>', 19.5], ['fare', '>', 7.8146]],
                                                      id: '8bff334c-7f05-4b76-8beb-0cb587651476',
                                                      parentId: '324b3b2e-d287-4e2d-aa8b-14c9dbeb4393',
                                                      childNodes: {
                                                        true: {
                                                          isLeaf: false,
                                                          chosenSplitCriteria: ['age', '>', 16],
                                                          impurityScore: 0,
                                                          bestSplits: [{ split: ['age', '>', 16], score: 0 }, { split: ['fare', '>', 8.84795], score: 0.3333333333333333 }, { split: ['age', '>', 18.5], score: 0.3333333333333333 }],
                                                          dataPartitionsCounts: { false: { No: 1 }, true: { Yes: 2 } },
                                                          classCounts: { No: 1, Yes: 2 },
                                                          depth: 14,
                                                          alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['fare', '>', 10.825], ['fare', '>', 7.7625], ['parch', '>', 1.5], ['age', '>', 27], ['age', '>', 25.5], ['age', '>', 19.5], ['fare', '>', 7.8146], ['age', '>', 16]],
                                                          id: '1fe53ac6-fd55-4e47-b711-ff22d53c2b8c',
                                                          parentId: '8bff334c-7f05-4b76-8beb-0cb587651476',
                                                          childNodes: {
                                                            false: {
                                                              isLeaf: true, impurityScore: null, bestSplits: [], dataPartitionsCounts: {}, classCounts: { No: 1 }, depth: 15, alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['fare', '>', 10.825], ['fare', '>', 7.7625], ['parch', '>', 1.5], ['age', '>', 27], ['age', '>', 25.5], ['age', '>', 19.5], ['fare', '>', 7.8146], ['age', '>', 16]], id: '3b134a2e-1af8-4d41-95cd-d85d3f9401a5', parentId: '1fe53ac6-fd55-4e47-b711-ff22d53c2b8c'
                                                            },
                                                            true: {
                                                              isLeaf: true, chosenSplitCriteria: ['fare', '>', 8.84795], impurityScore: 0, bestSplits: [{ split: ['fare', '>', 8.84795], score: 0 }, { split: ['age', '>', 18.5], score: 0 }, { split: ['sibsp', '>', 0.5], score: 0 }], dataPartitionsCounts: { true: { Yes: 1 }, false: { Yes: 1 } }, classCounts: { Yes: 2 }, depth: 15, alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['fare', '>', 10.825], ['fare', '>', 7.7625], ['parch', '>', 1.5], ['age', '>', 27], ['age', '>', 25.5], ['age', '>', 19.5], ['fare', '>', 7.8146], ['age', '>', 16], ['fare', '>', 8.84795]], id: '8657515e-85c9-4c30-baa3-4631872b8648', parentId: '1fe53ac6-fd55-4e47-b711-ff22d53c2b8c'
                                                            }
                                                          }
                                                        },
                                                        false: {
                                                          isLeaf: true, impurityScore: null, bestSplits: [], dataPartitionsCounts: {}, classCounts: { No: 1 }, depth: 14, alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['fare', '>', 10.825], ['fare', '>', 7.7625], ['parch', '>', 1.5], ['age', '>', 27], ['age', '>', 25.5], ['age', '>', 19.5], ['fare', '>', 7.8146]], id: 'c414169f-8ea6-4e74-87b4-24c2b6406548', parentId: '8bff334c-7f05-4b76-8beb-0cb587651476'
                                                        }
                                                      }
                                                    }
                                                  }
                                                },
                                                true: {
                                                  isLeaf: true, chosenSplitCriteria: ['fare', '>', 7.8896], impurityScore: 0, bestSplits: [{ split: ['fare', '>', 7.8896], score: 0 }], dataPartitionsCounts: { true: { Yes: 1 }, false: { Yes: 1 } }, classCounts: { Yes: 2 }, depth: 12, alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['fare', '>', 10.825], ['fare', '>', 7.7625], ['parch', '>', 1.5], ['age', '>', 27], ['age', '>', 25.5], ['fare', '>', 7.8896]], id: 'e5275b9a-fdad-44cf-b6bc-7da3ad2c97aa', parentId: 'bef4a380-ac90-4010-971b-ff012c6a3807'
                                                }
                                              }
                                            }
                                          }
                                        },
                                        true: {
                                          isLeaf: true, impurityScore: null, bestSplits: [], dataPartitionsCounts: {}, classCounts: { Yes: 1 }, depth: 10, alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['fare', '>', 10.825], ['fare', '>', 7.7625], ['parch', '>', 1.5]], id: '1f4a129a-563a-42cc-ae15-506f57c563eb', parentId: 'ade97a56-21df-4676-8c1c-5425cccc0241'
                                        }
                                      }
                                    },
                                    false: {
                                      isLeaf: true, chosenSplitCriteria: ['fare', '>', 7.7], impurityScore: 0, bestSplits: [{ split: ['fare', '>', 7.7], score: 0 }, { split: ['age', '>', 21.5], score: 0 }], dataPartitionsCounts: { true: { Yes: 1 }, false: { Yes: 1 } }, classCounts: { Yes: 2 }, depth: 9, alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['fare', '>', 10.825], ['fare', '>', 7.7625], ['fare', '>', 7.7]], id: '9d570258-3598-41ce-80d5-c6869781b8fb', parentId: 'cabc5bbb-47a9-460b-8890-2152f06f990e'
                                    }
                                  }
                                }
                              }
                            },
                            Q: {
                              isLeaf: true, chosenSplitCriteria: ['age', '>', 29.25], impurityScore: 0.24999999999999992, bestSplits: [{ split: ['age', '>', 29.25], score: 0.24999999999999992 }, { split: ['parch', '>', 0.5], score: 0.24999999999999992 }, { split: ['age', '>', 31.25], score: 0.31578947368421045 }], dataPartitionsCounts: { false: { Yes: 15, No: 3 }, true: { No: 2 } }, classCounts: { Yes: 15, No: 5 }, depth: 7, alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['age', '>', 29.25]], id: 'cc824e75-c740-44a7-91d8-e54c1500fe91', parentId: '1edfb239-24a7-4ab9-a6c6-ccf29b18c709'
                            },
                            C: {
                              isLeaf: false,
                              chosenSplitCriteria: ['fare', '>', 17.252049999999997],
                              impurityScore: 0.3333333333333333,
                              bestSplits: [{ split: ['fare', '>', 17.252049999999997], score: 0.3333333333333333 }, { split: ['fare', '>', 12.84795], score: 0.42857142857142866 }, { split: ['fare', '>', 20.8083], score: 0.42857142857142866 }],
                              dataPartitionsCounts: { false: { No: 4, Yes: 2 }, true: { Yes: 2 } },
                              classCounts: { No: 4, Yes: 4 },
                              depth: 7,
                              alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['fare', '>', 17.252049999999997]],
                              id: '5dd08930-d26c-4dea-ad9f-e30235115bb3',
                              parentId: '1edfb239-24a7-4ab9-a6c6-ccf29b18c709',
                              childNodes: {
                                false: {
                                  isLeaf: true, chosenSplitCriteria: ['fare', '>', 12.84795], impurityScore: 0.26666666666666655, bestSplits: [{ split: ['fare', '>', 12.84795], score: 0.26666666666666655 }, { split: ['fare', '>', 14.85], score: 0.3333333333333333 }, { split: ['age', '>', 21.5], score: 0.3333333333333333 }], dataPartitionsCounts: { true: { No: 4, Yes: 1 }, false: { Yes: 1 } }, classCounts: { No: 4, Yes: 2 }, depth: 8, alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['fare', '>', 17.252049999999997], ['fare', '>', 12.84795]], id: 'afa651b5-2c7a-466f-b22c-4f100a82c276', parentId: '5dd08930-d26c-4dea-ad9f-e30235115bb3'
                                },
                                true: {
                                  isLeaf: true, chosenSplitCriteria: ['fare', '>', 20.8083], impurityScore: 0, bestSplits: [{ split: ['fare', '>', 20.8083], score: 0 }, { split: ['age', '>', 16.5], score: 0 }, { split: ['parch', '>', 1.5], score: 0 }], dataPartitionsCounts: { true: { Yes: 1 }, false: { Yes: 1 } }, classCounts: { Yes: 2 }, depth: 8, alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '=='], ['fare', '>', 17.252049999999997], ['fare', '>', 20.8083]], id: 'b20fccdb-4747-4c7a-9a4c-68202b4ac9e8', parentId: '5dd08930-d26c-4dea-ad9f-e30235115bb3'
                                }
                              }
                            }
                          }
                        },
                        false: {
                          isLeaf: true, chosenSplitCriteria: ['embarked', '=='], impurityScore: 0, bestSplits: [{ split: ['embarked', '=='], score: 0 }], dataPartitionsCounts: { Q: { No: 1 } }, classCounts: { No: 1 }, depth: 6, alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['fare', '>', 7.6396], ['embarked', '==']], id: '439b6def-e573-4471-9a53-33ae4f72b2b1', parentId: '42218b94-5a0a-4a59-ab92-b157f4c05430'
                        }
                      }
                    },
                    true: {
                      isLeaf: true, chosenSplitCriteria: ['age', '>', 54], impurityScore: 0, bestSplits: [{ split: ['age', '>', 54], score: 0 }, { split: ['age', '>', 43], score: 0.2 }, { split: ['fare', '>', 12.02085], score: 0.26666666666666666 }], dataPartitionsCounts: { false: { No: 4 }, true: { Yes: 1 } }, classCounts: { No: 4, Yes: 1 }, depth: 5, alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['age', '>', 36.5], ['age', '>', 54]], id: 'ca2359f1-02eb-4cf3-bb30-1aad20b8c02f', parentId: '10fd7e20-1018-4a43-9cbf-871a699f5990'
                    }
                  }
                },
                false: {
                  isLeaf: true, chosenSplitCriteria: ['fare', '>', 7.2271], impurityScore: 0, bestSplits: [{ split: ['fare', '>', 7.2271], score: 0 }, { split: ['fare', '>', 7.239599999999999], score: 0 }, { split: ['fare', '>', 7.3729], score: 0 }], dataPartitionsCounts: { true: { Yes: 5 }, false: { Yes: 1 } }, classCounts: { Yes: 6 }, depth: 4, alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['fare', '>', 7.5896], ['fare', '>', 7.2271]], id: 'b1a75f96-9724-42d9-89b7-314a54460444', parentId: 'a712aaf7-389f-4b72-a2e3-f2dfab6d9642'
                }
              }
            },
            true: {
              isLeaf: true, chosenSplitCriteria: ['parch', '>', 0.5], impurityScore: 0.11029411764705882, bestSplits: [{ split: ['parch', '>', 0.5], score: 0.11029411764705882 }, { split: ['embarked', '=='], score: 0.16862745098039206 }, { split: ['sibsp', '>', 1.5], score: 0.1764705882352941 }], dataPartitionsCounts: { true: { No: 15, Yes: 1 }, false: { Yes: 1 } }, classCounts: { No: 15, Yes: 2 }, depth: 3, alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 23.25415], ['parch', '>', 0.5]], id: '4442bcc1-357a-43bc-89f7-066b5a065dbd', parentId: '7d0038fe-b325-4989-9720-92d8ba939d77'
            }
          }
        },
        false: {
          isLeaf: true, chosenSplitCriteria: ['fare', '>', 26.125], impurityScore: 0.07982261640798223, bestSplits: [{ split: ['fare', '>', 26.125], score: 0.07982261640798223 }, { split: ['fare', '>', 22], score: 0.07991562208429685 }, { split: ['fare', '>', 26.26665], score: 0.08057851239669418 }], dataPartitionsCounts: { false: { Yes: 36, No: 5 }, true: { Yes: 69 } }, classCounts: { Yes: 105, No: 5 }, depth: 2, alreadyUsedSplits: [['sex', '=='], ['pclass', '>', 2.5], ['fare', '>', 26.125]], id: '1176ff22-c223-49ee-ac78-c5fbfccb99fe', parentId: '73408045-08c7-4d6c-ae98-089ab0f37f4e'
        }
      }
    }
  }
} as unknown as TreeGardenNode;
