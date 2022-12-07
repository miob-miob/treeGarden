/**
 * This namespace holds implementations of pre-pruning and post-pruning [see  tree pruning docs](../../../importantBasics#tree-pruning)
 * @module
 */

import {
  getPrunedTreeByCostComplexityPruning,
  getPrunedTreeByPessimisticPruning,
  getPrunedTreeByReducedErrorPruning,
  stopIfDepthIs,
  stopIfMinimalNumberOfSamplesInNode,
  stopRules
} from '../pruneTree';

import { getPrunedTreeScore } from '../pruneTree/reducedErrorPrunning';

export {
  stopRules,
  stopIfDepthIs,
  stopIfMinimalNumberOfSamplesInNode,
  getPrunedTreeByCostComplexityPruning,
  getPrunedTreeByReducedErrorPruning,
  getPrunedTreeByPessimisticPruning,
  getPrunedTreeScore
};
