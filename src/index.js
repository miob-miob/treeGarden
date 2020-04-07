import { tennisSet } from './sampleDataSets';
import { getEntropyOfDataSet } from './utils/entropy';
import { getClassesOfDataSet } from './utils/dataSet';

const classesOfDataSet = getClassesOfDataSet(tennisSet);
console.log(`Entropy of tennis dataset is: ${getEntropyOfDataSet(tennisSet, classesOfDataSet)}`);
