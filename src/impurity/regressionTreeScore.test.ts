import { simpleDataSetForRegressionTree } from '../sampleDataSets/simpleForRegressionTree';
import { getScoreForRegressionTreeSplit } from './regressionTreeScore';
import { buildAlgorithmConfiguration } from '../algorithmConfiguration';
import { getSplitCriteriaFn, splitDataSet } from '../dataSet/split';


const config = buildAlgorithmConfiguration(simpleDataSetForRegressionTree, { treeType: 'regression' });
test('getScoreForRegressionTreeSplit', () => {
  const splitter = getSplitCriteriaFn('color', '==');
  const childDataSets = splitDataSet(simpleDataSetForRegressionTree, splitter, true);


  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  const manualAverages = { // just information
    white: 2.1,
    black: 1.1
  };
  // every sample from 'white' - white average + every sample from 'black' - black average
  const expectedResidual = 0.2 + 0.6;

  expect(getScoreForRegressionTreeSplit(simpleDataSetForRegressionTree, childDataSets, config, splitter)).toBeCloseTo(expectedResidual, 5);
});
