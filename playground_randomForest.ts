import { growRandomForest } from './src/growRandomForest';
import { buildAlgorithmConfiguration, c45Config } from './src/algorithmConfiguration';
import { titanicSet } from './src/sampleDataSets';
import {composeStopFunctions, stopIfPure} from "./src/pruneTree";
import {stopIfDepthIs, stopIfNoSplitsAvailable,stopIfMinimalNumberOfSamplesInInnerNode} from "./src/pruneTree";
import {getRandomForestPrediction} from "./src/predict";
import {getMostCommonTagOfSamplesInNode} from "./src/dataSet/replaceMissingValues";




const config = buildAlgorithmConfiguration(titanicSet,{
  excludedAttributes: ['name', 'ticket', 'embarked', 'cabin'],
  attributes: { sibsp: { dataType: 'continuous' }, pclass:{dataType: 'discrete'},parch:{dataType: "discrete"} },
  getTagOfSampleWithMissingValueWhileClassifying:getMostCommonTagOfSamplesInNode,
  shouldWeStopGrowth: composeStopFunctions(
    stopIfPure,
    stopIfNoSplitsAvailable,
    // stopIfDepthIs(10)
  ),
  numberOfTrees:50
});



const {trees,oobError} =  growRandomForest( config, titanicSet)

const passenger = {
  fare: 7.2292,
  name: 'Ayoub, Miss. Banoura',
  embarked: 'C',
  age: 13,
  parch: 0,
  pclass: 3,
  sex: 'female',
  ticket: '2687',
  sibsp: 0,
  _class: 'Yes',
  _label: 781,
  _id: 'd3245bae-62e1-4ff1-ac2f-0a30449d4d00'
}


console.log(oobError,trees.length)
console.log(getRandomForestPrediction(passenger,trees,config))

