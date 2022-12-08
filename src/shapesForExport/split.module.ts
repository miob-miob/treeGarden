
/**
 * With help of function defined inside this namespace you can define your own spit criteria.
 * If these, automatically generated from attribute definitions are not enough for you. This should not be generally needed,
 * for some advanced usages, you can create some pseudo fields in your data set.
 *
 * [code_file](docs/code_snippets/customSplitCriteria.ts)
 * If you put output to visualization tool, you can see our split criteria was used couple of times ;)
 * @module
 */
export {
  getPossibleSpitCriteriaForContinuousAttribute,
  getPossibleSpitCriteriaForDiscreteAttribute,
  getSplitCriteriaFn
} from '../split';

