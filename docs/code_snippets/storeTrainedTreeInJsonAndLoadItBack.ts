import fs from 'fs';
import { sampleTrees } from '../../src';


// storing model
const treeFile = 'myTree.json';
fs.writeFileSync(treeFile, JSON.stringify(sampleTrees.titanicTree));
console.log('Stored my model in:', treeFile);


// loading model

// if You have properly setup typescript you can also import JSON files without reading them with node fs
const myLoadedTree = JSON.parse(fs.readFileSync(treeFile).toString());
console.log('loaded model from ', treeFile);
console.log(myLoadedTree);

// you can use tree to predict some data now...

