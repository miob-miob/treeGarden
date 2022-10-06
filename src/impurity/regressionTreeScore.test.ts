import { simpleSetForRegression } from '../sampleDataSets/simpleForRegressionTree';
import { getScoreForRegressionTreeSplit } from './regressionTreeScore';
import { buildAlgorithmConfiguration } from '../algorithmConfiguration';
import { getSplitCriteriaFn, splitDataSet } from '../split';


const config = buildAlgorithmConfiguration(simpleSetForRegression, { treeType: 'regression' });
test('getScoreForRegressionTreeSplit', () => {
  const splitter = getSplitCriteriaFn('color', '==');
  const childDataSets = splitDataSet(simpleSetForRegression, splitter, true);


  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  const manualAverages = { // just information
    white: 2.1,
    black: 1.1
  };
  // every sample from 'white' - white average + every sample from 'black' - black average
  const expectedResidual = 0.2 + 0.6;

  expect(getScoreForRegressionTreeSplit(simpleSetForRegression, childDataSets, config, splitter)).toBeCloseTo(expectedResidual, 5);
});
