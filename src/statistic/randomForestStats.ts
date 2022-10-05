/* eslint-disable no-underscore-dangle */
import { TreeGardenNode } from '../treeNode';
import { TreeGardenDataSample } from '../dataSet/set';
import { getBootstrappedDataSetAndOutOfTheBagRest } from '../dataSet/dividingAndBootstrapping';
import { TreeGardenConfiguration } from '../algorithmConfiguration';
import { getMissClassificationRateRaw, getRAbsErrorRaw } from './treeStats';

type OutOfTheBagSet = ReturnType<typeof getBootstrappedDataSetAndOutOfTheBagRest>[1];
export const getOutOfTheBagError = (
  treesAndOutOfTheBagSets:[TreeGardenNode, OutOfTheBagSet][],
  fullDataSet:TreeGardenDataSample[],
  config: TreeGardenConfiguration,
  majorityVotingFn : TreeGardenConfiguration['majorityVoting']
) => {
  const predictedResults:TreeGardenDataSample['_class'][] = [];
  const realResults :TreeGardenDataSample['_class'][] = [];
  fullDataSet.forEach((sample) => {
    // find trees on which sample was not used for training
    const treesThatWasNotTrainedOnSample = treesAndOutOfTheBagSets
      .reduce((trees, current) => {
        const [treeRoot, oobIdSet] = current;
        if (oobIdSet.has(sample._id)) {
          trees.push(treeRoot);
        }
        return trees;
      }, [] as TreeGardenNode[]);
    // if there is no tree that was not trained on this sample skip this sample for oob error calculation
    if (treesThatWasNotTrainedOnSample.length > 0) {
      predictedResults.push(majorityVotingFn(treesThatWasNotTrainedOnSample, sample, config));
      realResults.push(sample._class as number|string);
    }
  });

  // todo think about passing it to config getRAbsErrorRaw  getMissClassificationRateRaw
  if (config.treeType === 'classification') {
    return getMissClassificationRateRaw(realResults, predictedResults);
  }
  return getRAbsErrorRaw(realResults as number[], predictedResults as number[]);
};
