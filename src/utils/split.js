
const knownOperators = new Set([
  '==',
  '>=',
  '<=',
  '>',
  '<',
  'customFn'
]);


const getSplitFnByRule = (attributeId, operator, value) => {
  if (operator === '==') {
    return (currentSample, splittedDataset, wholeDataset) => {
      if (value) {
        return Array.isArray(value) ? value.includes(currentSample[attributeId]) : currentSample[attributeId] === value;
      }
    };
  }
  else {
    // todo return funtion that returns splitted group of given sample
  }
};

const splitDataSet = '';
