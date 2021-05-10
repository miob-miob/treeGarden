import { PartialAlgorithmConfiguration } from './buildAlgorithmConfiguration';
import { getInformationGainRatioForSplit } from '../impurity/entropy';
import { getMostCommonTagOfSamplesInNode } from '../dataSet/replaceMissingValues';

// when you prune with pessimistic error pruning then running C4.5 algorithm
export const c45Config:PartialAlgorithmConfiguration = {
  impurityScoringForSplit: getInformationGainRatioForSplit,
  biggerImpurityScoreBetterSplit: true,
  getTagOfSampleWithMissingValueWhileClassifying: getMostCommonTagOfSamplesInNode
};
