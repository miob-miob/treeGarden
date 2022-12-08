// todo if we go hardly after bundle size - this would not be ideal
// There is some hacking around types in all pre trained trees because of typedoc
/**
 * This namespaces contains pre trained trees, that you can use for classification.
 * @module
 */
import {
  simpleRegressionTree,
  simpleTree,
  tennisTree,
  titanicTree,
  titanicTreeTwo
} from '../sampleTrainedTrees';

export {
  titanicTree,
  titanicTreeTwo,
  tennisTree,
  simpleTree,
  simpleRegressionTree
};
