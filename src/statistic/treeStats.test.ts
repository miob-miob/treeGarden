/* eslint-disable no-underscore-dangle */
import { simple } from '../sampleDataSets';
import { induceTree } from '../induceTree';
import { getNumberOfSamplesInNode, getNumberOfTreeNodes, getTreeAccuracy } from './treeStats';
import { buildAlgorithmConfiguration } from '../algorithmConfiguration';
import { simpleTree } from '../sampleTrainedTrees/simpleTree';
import { tennisTree } from '../sampleTrainedTrees/tennisTree';


const config = buildAlgorithmConfiguration(simple);
const tree = induceTree(config, simple);

describe('getTreeAccuracy', () => {
  test('should be absolute', () => {
    expect(getTreeAccuracy(tree, simple, config)).toBeCloseTo(1);
  });
  test('should be 60%', () => {
    const deepCopyOfSimple = JSON.parse(JSON.stringify(simple));
    deepCopyOfSimple[0]._class = 'right';
    deepCopyOfSimple[2]._class = 'left';
    expect(getTreeAccuracy(tree, deepCopyOfSimple, config)).toBeCloseTo(0.6);
  });
});


test('getNumberOfTreeNodes', () => {
  expect(getNumberOfTreeNodes(simpleTree)).toBe(3);
  expect(getNumberOfTreeNodes(tennisTree.childNodes.Rain)).toBe(3);
});


test('getNumberOfSamplesInNode', () => {
  expect(getNumberOfSamplesInNode(tennisTree)).toBe(14);
});


