
import { tennisSet } from './sampleDataSets';
import { getEntropyForDataSet } from './utils/impurity/entropy';
import { getClassesOfDataSet } from './utils/dataSet/set';
import { getGiniIndexForDataSet } from './utils/impurity/gini';

const classesOfDataSet = getClassesOfDataSet(tennisSet);
console.log(classesOfDataSet);
console.log(`Entropy of tennis dataset is: ${getEntropyForDataSet(tennisSet, classesOfDataSet)}`);
console.log(`Gini of tennis dataset is: ${getGiniIndexForDataSet(tennisSet, classesOfDataSet)}`);
