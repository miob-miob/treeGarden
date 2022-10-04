import { growRandomForest } from './src/growRandomForest';
import { buildAlgorithmConfiguration } from './src';
import { titanicSet } from './src/sampleDataSets';
import {getRandomForestPrediction} from "./src/predict";
import {getMostCommonTagOfSamplesInNode} from "./src/dataSet/replaceMissingValues";
import {composeStopFunctions, stopIfDepthIs,stopIfPure, stopIfMinimalNumberOfSamplesInInnerNode} from "./src/pruneTree";


const config = buildAlgorithmConfiguration(titanicSet,{
  excludedAttributes: ['name', 'ticket', 'embarked', 'cabin'],
  getTagOfSampleWithMissingValueWhileClassifying: getMostCommonTagOfSamplesInNode,
  shouldWeStopGrowth: composeStopFunctions(
    stopIfDepthIs(10),
    stopIfPure,
    stopIfMinimalNumberOfSamplesInInnerNode(10)
  ),
  numberOfTrees:50
});

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
  _label: 781,
  _id: 'd3245bae-62e1-4ff1-ac2f-0a30449d4d00'
}

const {trees,oobError} =  growRandomForest( config, titanicSet)

console.log(`Out of the bag error for our trained forrest: ${oobError} % correct classifications!`)
console.log("Would our passenger survive on titanic? - ", getRandomForestPrediction(passenger,trees,config))

