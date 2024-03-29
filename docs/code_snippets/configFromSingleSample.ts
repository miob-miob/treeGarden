
// in case of prediction we do not have whole data set available, but we still need algorithmConfiguration for prediction.
// we can inherit configuration just with single complete sample and knowledge of all classes in case of classification tree
// we do not need to write it by hand...

import {
  buildAlgorithmConfiguration,
  getTreePrediction,
  sampleTrees
} from '../../src';

// Let`s use pretrained tree, which is bundled with tree-garden
const { tennisTree } = sampleTrees;

// we need configuration in order to be able to predict some unknown samples
// we will buildConfiguration using just single complete (without missing values) [sample for config]
// sample and knowledge of all classes
const singleSample = {
  _label: '5', outlook: 'Rain', temp: 'Cool', humidity: 'Normal', wind: 'Weak', _class: 'Yes'
};

// full configuration that can be used for predictions
const config = buildAlgorithmConfiguration(
  [singleSample],
  {
    allClasses: ['Yes', 'No'] // [important]
  }
);


// sample of interest - based on today`s weather ;)
const shouldIGoToPlayTennisTodaySample = {
  outlook: 'Sunny',
  temp: 'Mild',
  humidity: 'Normal',
  wind: 'Weak'
};

// prediction from our imported tree
const shouldIStayOrShouldIGo = getTreePrediction(shouldIGoToPlayTennisTodaySample, tennisTree, config);

// lets see if I should go
console.log(`Hey mighty tree, should i go play tennis today?\nMighty tree says: ${shouldIStayOrShouldIGo}`);

