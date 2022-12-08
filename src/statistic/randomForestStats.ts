/* eslint-disable no-underscore-dangle */
import { TreeGardenNode } from '../treeNode';
import { TreeGardenDataSample } from '../dataSet/set';
import { getBootstrappedDataSetAndOutOfTheBagRest } from '../dataSet/dividingAndBootstrapping';
import { TreeGardenConfiguration } from '../algorithmConfiguration';
import { getMissClassificationRateRaw, getRAbsErrorRaw } from './treeStats';
import { getResultFromMultipleTrees } from '../predict';

type OutOfTheBagSet = ReturnType<typeof getBootstrappedDataSetAndOutOfTheBagRest>[1];
/**
 * Function for calculation of [out of the bag error](https://en.wikipedia.org/wiki/Out-of-bag_error) for random forest.
 * It is calculated by default, during training of random forest. [See random forest example](../../examples/randomForest.md)
 */
export const getOutOfTheBagError = (
  treesAndOutOfTheBagSets:[TreeGardenNode, OutOfTheBagSet][],
  fullDataSet:TreeGardenDataSample[],
  config: TreeGardenConfiguration,
  majorityVotingFn : TreeGardenConfiguration['majorityVoting'] = getResultFromMultipleTrees
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


// todo implement importance of fields (calculate from random forest - reduction of information gain od all splits in whole tree among all trees)
