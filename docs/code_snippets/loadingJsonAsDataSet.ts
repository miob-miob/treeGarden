import { buildAlgorithmConfiguration } from '../../src';

// json as dataset
import myDataSet from './dataSet.json';

myDataSet.forEach((sample) => console.log(sample));

const algConfig = buildAlgorithmConfiguration(myDataSet, {});


console.log('see mom, I have algorithm config from json dataset!');
console.log(algConfig);


