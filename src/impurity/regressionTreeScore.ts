// todo regression tree score

import { housePrices } from '../sampleDataSets/housePrices';
import { buildAlgorithmConfiguration } from '../algorithmConfiguration';


const config = buildAlgorithmConfiguration(housePrices, { treeType: 'regression' });
console.log(config);

