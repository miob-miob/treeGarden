
import {
  getTreePrediction,
  getLeafNodesForSamples,
  getLeafNodeOfSample,
  getMostCommonClassForNode,
  getResultFromMultipleTrees,
  getRandomForestPrediction,
  getReadyToPredictSamples
} from './predict';
import { buildAlgorithmConfiguration } from './algorithmConfiguration';
import { simpleSet, tennisSet } from './sampleDataSets';
import { tennisTree } from './sampleTrainedTrees/tennisTree';
import { getTreeNodeById, TreeGardenNode } from './treeNode';
import { getRightOnBlackSimpleTree } from './testUtils';
import { defaultConfiguration } from './algorithmConfiguration/algorithmDefaultConfiguration';
import { TreeGardenDataSample } from './dataSet/set';
import { simpleTree } from './sampleTrainedTrees/simpleTree';
import { getMostCommonTagOfSamplesInNode } from './dataSet/replaceMissingValues';


const samples = [
  { outlook: 'Sunny', humidity: 'High' },
  { outlook: 'Rain', wind: 'Weak' }
];
const leafNodes = [
  tennisTree.childNodes.Sunny.childNodes.High,
  tennisTree.childNodes.Rain.childNodes.Weak
];
const config = buildAlgorithmConfiguration(tennisSet);

test('getLeafNodeOfSample', () => {
  const sample = samples[0];
  expect(getLeafNodeOfSample(sample, tennisTree, config)).toEqual(
    getTreeNodeById(tennisTree, '9f156fc0-3f82-4a31-863e-108bfb37fc60')
  );
  expect(getLeafNodeOfSample(sample, tennisTree, config, true)).toEqual([
    'f2f856dc-c656-4689-b32a-a4b3a4c3aaab',
    'c4402f7c-f227-48ab-8040-a703dd34e7ab',
    '9f156fc0-3f82-4a31-863e-108bfb37fc60'
  ]);
});

// todo test also replacing of missing values when implemented
test('getLeafNodesForSamples', () => {
  const result = getLeafNodesForSamples(samples, tennisTree, config);
  expect(result[0][0]).toEqual(samples[0]);
  expect(result[0][1]).toEqual(leafNodes[0]);

  expect(result[1][0]).toEqual(samples[1]);
  expect(result[1][1]).toEqual(leafNodes[1]);
});

test('getTreePrediction', () => {
  const result = getTreePrediction(samples, tennisTree, config);
  expect(result[0][0]).toEqual(samples[0]);
  expect(result[0][1]).toEqual('No');

  expect(result[1][0]).toEqual(samples[1]);
  expect(result[1][1]).toEqual('Yes');
});

test('getRandomForestPrediction', () => {
  const rightOnBlackTree = getRightOnBlackSimpleTree();
  const trees = [
    simpleTree,
    simpleTree,
    rightOnBlackTree
  ];
  const algConfig = buildAlgorithmConfiguration(simpleSet, {
    getTagOfSampleWithMissingValueWhileClassifying: getMostCommonTagOfSamplesInNode
  });
  const sampleWithMissingColor = {
    size: 3
  };

  expect(getRandomForestPrediction(sampleWithMissingColor, trees, algConfig)).toBe('right');

  const sample = {
    color: 'black',
    size: 3
  };

  const anotherTrees = [
    rightOnBlackTree,
    simpleTree,
    simpleTree
  ];

  expect(getRandomForestPrediction(sample, anotherTrees, algConfig)).toBe('left');
  expect(getRandomForestPrediction([sample], anotherTrees, algConfig)).toStrictEqual([
    [sample, 'left']
  ]);
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

test('getResultFromMultipleTrees', () => {
  const mergeRegressionResultsWithSpy = jest.fn(defaultConfiguration.mergeClassificationResults);
  const badOnBlackTree = getRightOnBlackSimpleTree();
  const algConfig = buildAlgorithmConfiguration(simpleSet, {
    mergeClassificationResults: mergeRegressionResultsWithSpy
  });
  const dataSample = { color: 'black', size: 3, _label: '1' } as TreeGardenDataSample;
  expect(getResultFromMultipleTrees(
    [simpleTree, badOnBlackTree, simpleTree, badOnBlackTree, badOnBlackTree],
    dataSample,
    algConfig
  )).toBe('right');
  expect(mergeRegressionResultsWithSpy).toHaveBeenNthCalledWith(1, ['left', 'right', 'left', 'right', 'right']);

  expect(getResultFromMultipleTrees(
    [simpleTree, simpleTree, simpleTree, badOnBlackTree, badOnBlackTree],
    dataSample,
    algConfig
  )).toBe('left');
  expect(mergeRegressionResultsWithSpy).toHaveBeenNthCalledWith(2, ['left', 'left', 'left', 'right', 'right']);
});

test('getReadyToPredictSamples', () => {
  const consoleWarnSpy = jest.spyOn(console, 'warn');
  const simpleConf = buildAlgorithmConfiguration(simpleSet);
  const setWithMissingValues = [
    {},
    {}
  ] as TreeGardenDataSample[];

  const readyToClassifySamples = getReadyToPredictSamples(
    setWithMissingValues,
    simpleConf,
    simpleSet
  );

  expect(readyToClassifySamples[0].color).toBeDefined();
  expect(readyToClassifySamples[1].color).toBeDefined();
  expect(consoleWarnSpy).toBeCalledTimes(1);

});
