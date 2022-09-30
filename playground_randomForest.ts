import { growRandomForest } from './src/growRandomForest';
import { buildAlgorithmConfiguration, c45Config } from './src/algorithmConfiguration';
import { titanicSet } from './src/sampleDataSets';
import {composeStopFunctions, stopIfPure} from "./src/pruneTree";
import {stopIfDepthIs, stopIfNoSplitsAvailable,stopIfMinimalNumberOfSamplesInInnerNode} from "./src/pruneTree";




const config = buildAlgorithmConfiguration(titanicSet,{
  excludedAttributes: ['name', 'ticket', 'embarked', 'cabin'],
  attributes: { sibsp: { dataType: 'continuous' }, pclass:{dataType: 'discrete'},parch:{dataType: "discrete"} },
  shouldWeStopGrowth: composeStopFunctions(
    stopIfPure,
    stopIfNoSplitsAvailable,
    stopIfDepthIs(10)
  )
});



const trainedForest =  growRandomForest({
  numberOfTrees:5000,
},config,titanicSet)

console.log(trainedForest.oobError)

