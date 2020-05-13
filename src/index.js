import { tennisSet } from './sampleDataSets';
import { getEntropyOfDataSet } from './utils/impurity/entropy';
import { getClassesOfDataSet } from './utils/dataSet/set';

const classesOfDataSet = getClassesOfDataSet(tennisSet);
console.log(`Entropy of tennis dataset is: ${getEntropyOfDataSet(tennisSet, classesOfDataSet)}`);
