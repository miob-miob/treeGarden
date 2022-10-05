/* eslint-disable no-underscore-dangle */
import { growTree } from '../growTree';
import {
  getNumberOfSamplesInNode, getNumberOfTreeNodes, getMissClassificationRate, getRAbsError
} from './treeStats';
import { buildAlgorithmConfiguration } from '../algorithmConfiguration';
import { simpleTree } from '../sampleTrainedTrees/simpleTree';
import { tennisTree } from '../sampleTrainedTrees/tennisTree';
import { simpleRegressionTree } from '../sampleTrainedTrees/simpleRegressionTree';
import { simpleSetForRegression, simpleSet } from '../sampleDataSets';
import { getScoreForRegressionTreeSplit } from '../impurity/regressionTreeScore';


const config = buildAlgorithmConfiguration(simpleSet);
const tree = growTree(config, simpleSet);
describe('getMissClassificationRate', () => {
  test('should be absolute', () => {
    expect(getMissClassificationRate(tree, simpleSet, config)).toBeCloseTo(1);
  });
  test('should be 60%', () => {
    const deepCopyOfSimple = JSON.parse(JSON.stringify(simpleSet));
    deepCopyOfSimple[0]._class = 'right';
    deepCopyOfSimple[2]._class = 'left';
    expect(getMissClassificationRate(tree, deepCopyOfSimple, config)).toBeCloseTo(0.6);
  });
});

test('getRAbsError', () => {
  const regConfig = buildAlgorithmConfiguration(simpleSetForRegression, {
    treeType: 'regression',
    getScoreForSplit: getScoreForRegressionTreeSplit
  });
  // manualAverage = 1.5;
  const manualTotalVariation = 0.6 + 0.5 + 0.1 + 0.7 + 0.5;
  // width > 40.5
  const nodeWithTrue = 1.4;
  const nodeWithFalse = 1.525;
  const manualVariationFromPrediction = (nodeWithFalse - 0.9) + (nodeWithFalse - 1) + (nodeWithTrue - 1.4) + (2.2 - nodeWithFalse) + (2 - nodeWithFalse);
  expect(getRAbsError(simpleRegressionTree, simpleSetForRegression, regConfig)).toBeCloseTo(1 - (manualVariationFromPrediction / manualTotalVariation), 100);
});

test('getNumberOfTreeNodes', () => {
  expect(getNumberOfTreeNodes(simpleTree)).toBe(3);
  expect(getNumberOfTreeNodes(tennisTree.childNodes.Rain)).toBe(3);
});

test('getNumberOfSamplesInNode', () => {
  expect(getNumberOfSamplesInNode(tennisTree)).toBe(14);
});


