/* eslint-disable no-underscore-dangle,import/no-cycle */
import { getMostCommonValues } from '../statistic/getMostCommonValue';
import { chooseOne } from '../randomization';
import { TreeGardenDataSample, getClassesOfDataSet } from './set';
import { getMedian } from '../statistic/basicStatistic';
import { TreeGardenConfiguration } from '../algorithmConfiguration';
import { TreeGardenNode } from '../treeNode';

// todo because we infering configuration and some of functions here are used as default values of configuration
// todo  we are creating circular depenency - we must ommit algorithmConfig type ;(

/**
 * closure WARNING :D FF stands for Function Factory - on algorithm start it is called and replacer function is produced.
 * replacer function takes only sample and return sample copy with replaced values
 *
 * What it really does?
 * If replacer meets sample with missing attirbute color, it will check color of all samples in dataset and replaces color
 * of sample with most common color
 */
export const getMostCommonValueFF = (dataSet:TreeGardenDataSample[], attributeId:string, configuration:TreeGardenConfiguration) => {
  const typeOfAttribute = configuration.attributes[attributeId].dataType;
  const { missingValue } = configuration.attributes[attributeId];
  const valuesForGivenAttribute = dataSet
    .filter((sample) => (sample[attributeId] !== undefined && sample[attributeId] !== missingValue))
    .map((sample) => sample[attributeId]);
  if (valuesForGivenAttribute.length === 0) {
    throw new Error(`There is no values for attribute:'${attributeId}' - probably invalid attribute!`);
  }

  let mostCommonValues:(string|number)[];
  let median :number;
  if (typeOfAttribute === 'discrete') {
    mostCommonValues = getMostCommonValues(valuesForGivenAttribute);
  } else {
    median = getMedian(valuesForGivenAttribute);
  }
  // in case there is more than one most common value, choose one by random
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (sampleWithMissingValue:TreeGardenDataSample) => {
    if (typeOfAttribute === 'discrete') {
      return chooseOne(mostCommonValues);
    }
    return median;
  };
};


/**
 *
 *
 * closure WARNING :D FF stands for Function Factory see {@link getMostCommonValueFF}
 * this is usable only in induction time, evaluation samples do not have _class!
 *
 * What it really does?
 * It works like {@link getMostCommonValueFF} but also take into account sample class. So if class was
 * for instance `yes` it will find most common value for attribute just among samples with same class.
 */
export const getMostCommonValueAmongSameClassFF = (dataSet:TreeGardenDataSample[], attributeId:string, configuration:TreeGardenConfiguration) => {
  if (configuration.treeType === 'regression') {
    throw new Error('You cannot call \'getMostCommonValueAmongSameClassFF\' on treeType === \'regression\' tree!');
  }
  const allClassesOfDataSet = getClassesOfDataSet(dataSet);
  const classesAndCommonValuesForGivenAttributeId:{ [key:string]:string|number } = {};
  const { missingValue, dataType } = configuration.attributes[attributeId];
  allClassesOfDataSet.forEach((currentClass) => {
    const partitionValues = dataSet
      .filter((sample) => sample._class === currentClass && sample[attributeId] !== undefined && sample[attributeId] !== missingValue)
      .map((sample) => sample[attributeId]);
    if (partitionValues.length !== 0) {
      classesAndCommonValuesForGivenAttributeId[currentClass] = (dataType === 'discrete')
        ? chooseOne(getMostCommonValues(partitionValues)) : getMedian(partitionValues);
    }
  });
  return (sampleWithMissingValue:TreeGardenDataSample) => {
    if (!classesAndCommonValuesForGivenAttributeId[sampleWithMissingValue._class!]) {
      throw new Error(`
      There is no value for attribute '${attributeId}' among samples with class: '${sampleWithMissingValue._class}'!
      Use different method for replacement of missing values or discard sample entirely!
      `);
    }
    return classesAndCommonValuesForGivenAttributeId[sampleWithMissingValue._class!];
  };
};


type ReplaceOptions = {
  samplesToReplace:TreeGardenDataSample[],
  referenceDataSet?:TreeGardenDataSample[],
  algorithmConfiguration:TreeGardenConfiguration,
  replacerFactoryKey?: 'growMissingValueReplacement' | 'evaluateMissingValueReplacement'
};

/**
 * Get data set with replaced missing values according to reference dataset or itself if referenceDataSet is not provided
 */
export const getDataSetWithReplacedValues = ({
  samplesToReplace,
  algorithmConfiguration,
  referenceDataSet,
  replacerFactoryKey = 'growMissingValueReplacement'
}:ReplaceOptions) => {
  const usedReferenceSet = referenceDataSet || samplesToReplace;
  // cache replacers because if replacer is build it will iterate whole dataset
  const replacerHash: { [key:string]:Function } = {};
  const getReplacer = (attributeId:string) => {
    if (!replacerHash[attributeId]) {
      replacerHash[attributeId] = algorithmConfiguration.attributes[attributeId][replacerFactoryKey]!(usedReferenceSet, attributeId, algorithmConfiguration);
    }
    return replacerHash[attributeId];
  };
  const usedAttributes = Object.keys(algorithmConfiguration.attributes);
  return samplesToReplace.map((sample) => {
    const sampleCopy:{ [key:string]:TreeGardenDataSample } = {};
    let foundMissingValue = false;
    usedAttributes.forEach((attributeId) => {
      const { missingValue } = algorithmConfiguration.attributes[attributeId];
      if (sample[attributeId] === missingValue) {
        foundMissingValue = true;
        sampleCopy[attributeId] = getReplacer(attributeId)(sample);
      }
    });
    // sample copy was populated - we will need create full sample copy
    if (foundMissingValue) {
      return { ...sample, ...sampleCopy };
    }
    return sample;
  });
};

/**
 * Get most common tag among samples that landed in given node. See not class, but tag of split.
 */
export const getMostCommonTagOfSamplesInNode = (
  sample:TreeGardenDataSample,
  attributeId:string,
  nodeWhereWeeNeedValue:TreeGardenNode,
  _config:TreeGardenConfiguration
) => {
  // returns most common value from partitions
  const valuesAndCounts = Object.entries(nodeWhereWeeNeedValue.dataPartitionsCounts!)
    .map(([key, classCounts]) => [key, Object.values(classCounts).reduce((acc, curr) => acc + curr, 0)] as const)
    .sort((tupleOne, tupleTwo) => tupleTwo[1] - tupleOne[1]);
  return valuesAndCounts[0][0];
};
