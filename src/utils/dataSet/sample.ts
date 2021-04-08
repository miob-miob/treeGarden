/* eslint-disable no-underscore-dangle */
import { DataSetSample } from './set';

export const doesValueExistsOnSample = (sample:DataSetSample, attributeId:string) => sample[attributeId] !== undefined;
export const existingValueGuard = (sample:DataSetSample, attributeId:string) => {
  if (!doesValueExistsOnSample(sample, attributeId)) {
    throw new Error(`Value of attribute '${attributeId}' missing on sample '${sample._label}', use correct preprocessing of dataset.`);
  }
};
