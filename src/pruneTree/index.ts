export { getPrunedTreeByCostComplexityPruning } from './costComplexityPruning';
export { getPrunedTreeByReducedErrorPruning } from './reducedErrorPrunning';
export { getPrunedTreeByPessimisticPruning } from './pessimisticPrunning';
export {
  composeStopFunctions,
  stopIfPure,
  stopIfMinimalNumberOfSamplesInInnerNode,
  stopIfNoSplitsAvailable,
  stopIfDepthIs
} from './prePrunning';
