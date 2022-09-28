import { growRandomForest } from './src/growRandomForest';
import { buildAlgorithmConfiguration, c45Config } from './src/algorithmConfiguration';
import { titanicSet } from './src/sampleDataSets';
import {composeStopFunctions, stopIfPure} from "./src/pruneTree";
import {stopIfDepthIs, stopIfNoSplitsAvailable,stopIfMinimalNumberOfSamplesInInnerNode} from "./src/pruneTree";




const config = buildAlgorithmConfiguration(titanicSet,{
  ...c45Config,
  // shouldWeStopGrowth: composeStopFunctions(
  //   stopIfPure,
  //   stopIfNoSplitsAvailable,
  //   stopIfMinimalNumberOfSamplesInInnerNode(25)
  // )
});



const trainedForest =  growRandomForest({
  numberOfTrees:500,
},config,titanicSet)

console.log(trainedForest.oobError)

