/* eslint-disable no-underscore-dangle */

export type DataSetSample = {
  _class?:string,
  _label?:string|number,
  [key:string]:any
};

export const getClassesOfDataSet = (dataSet:DataSetSample[], alreadyKnownClasses :string[]|null = null) => {
  const classesSet = dataSet
    .reduce(
      (allKnownClasses, currentSample) => {
        if (!allKnownClasses.has(currentSample._class!)) {
          allKnownClasses.add(currentSample._class!);
        }
        return allKnownClasses;
      },
      new Set(alreadyKnownClasses || [])
    );
  return Array.from(classesSet);
};


export const getAllAttributeIds = (dataSet : DataSetSample[]) => {
  const resultSet = new Set<string>();
  dataSet.forEach((sample) => {
    Object.keys(sample)
      .filter((key) => key[0] !== '_') // filter out _label and _class
      .forEach((key) => {
        if (!resultSet.has(key)) {
          resultSet.add(key);
        }
      });
  });

  return [...resultSet];
};

// decide if values under given attributeId of dataset are continuous or discrete
export const getTypeOfAttribute = (dataSet:DataSetSample[], attributeId:string, missingValue:any = undefined) => {
  const allValuesAreNumbers = dataSet.map((sample) => sample[attributeId])
    .filter((value) => value !== missingValue) // filter out missing values
    .every((value) => typeof value === 'number');
  return allValuesAreNumbers ? 'continuous' : 'discrete';
};


export const getAllValuesOfAttribute = (attributeId:string, dataSet:DataSetSample[]) => dataSet.map((sample) => sample[attributeId]);
export const getAllUniqueValuesOfAttribute = (attributeId:string, dataSet:DataSetSample[]) => [...new Set(getAllValuesOfAttribute(attributeId, dataSet))];

export const consistentDataSetGuard = (dataSet:DataSetSample[], parentFnName = 'unknown') => {
  const sampleWithoutClass = dataSet.find((sample) => sample._class === undefined);
  if (sampleWithoutClass) {
    throw new Error(`While calling '${parentFnName}' '_class' must be defined on every sample `);
  }
};
