import { PartialAlgorithmConfiguration } from './buildAlgorithmConfiguration';
import { getGiniIndexForSplit } from '../impurity/gini';

/**
 *  CART algorithm default configuration - it is confusing because CART stands for **C**lassification **A**nd
 *  **R**egression **T**rees - here we have configuration for **classification tree only** - gini index can not be used
 *  as split scoring function for regression trees. This term is in my opinion used incorrectly, it was invented by Leo
 *  Breiman in 1984 - [check this book](https://www.taylorfrancis.com/books/mono/10.1201/9781315139470/classification-regression-trees-leo-breiman)
 *  if you search for CART on web, majority of articles will describe tree algorithm with configuration exported here.
 *  @remarks
 *  possible performance problems, see `onlyBinarySplits` of {@link TreeGardenConfiguration}
 */
export const cartConfig:PartialAlgorithmConfiguration = {
  onlyBinarySplits: true,
  getScoreForSplit: getGiniIndexForSplit,
  biggerScoreBetterSplit: false
};
