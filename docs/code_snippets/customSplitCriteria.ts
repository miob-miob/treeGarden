// WARNING: code is just for demonstration, how to use functions inside split namespace
// you can achieve same effect with data set preprocessing and it will be probably easier (recreate dataset to your needs)

import {
  growTree,
  buildAlgorithmConfiguration,
  split,
  impurity,
  prune,
  sampleDataSets,
  TreeGardenDataSample,
  TreeGardenConfiguration
} from '../../src';


// lets use build-in titanic data set
const { titanicSet } = sampleDataSets;

// lets speedup training phase and have just two age categories - by default all age ranges are generated
const myOwnContinuousAttributeGatheringFn = (attributeId:string, dataSet:TreeGardenDataSample[], configuration:TreeGardenConfiguration) => {
  if (attributeId === 'age') {
    // see we need to return array of arrays as you usually generate more criteria from single attribute
    return [
      ['age', '<', 10], // chick
      ['age', '>', 40] // elder
    ];
  }
  return split.getPossibleSpitCriteriaForContinuousAttribute(attributeId, dataSet, configuration);
};


const algorithmConfig = buildAlgorithmConfiguration(titanicSet, {
  // removed attributes with many values - i can use information gain, which is cheaper for calculation
  excludedAttributes: ['ticket', 'embarked', 'name', 'cabin'],
  getScoreForSplit: impurity.getInformationGainForSplit,
  getAllPossibleSplitCriteriaForContinuousAttribute: myOwnContinuousAttributeGatheringFn
});

const rawTree = growTree(algorithmConfig, titanicSet);
const prunedTree = prune.getPrunedTreeByPessimisticPruning(rawTree);

// output result - put it to visualization tool
console.log(JSON.stringify(prunedTree));
