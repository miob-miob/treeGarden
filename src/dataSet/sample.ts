/* eslint-disable no-underscore-dangle */
import { TreeGardenDataSample } from './set';

export const doesValueExistsOnSample = (sample:TreeGardenDataSample, attributeId:string) => sample[attributeId] !== undefined;
export const existingValueGuard = (sample:TreeGardenDataSample, attributeId:string) => {
  if (!doesValueExistsOnSample(sample, attributeId)) {
    throw new Error(`Value of attribute '${attributeId}' missing on sample '${sample._label}', use correct preprocessing of dataset.`);
  }
};
