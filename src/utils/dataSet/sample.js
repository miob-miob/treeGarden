/* eslint-disable no-underscore-dangle */
export const doesValueExistsOnSample = (sample, attributeId) => sample[attributeId] !== undefined;
export const existingValueGuard = (sample, attributeId) => {
  if (!doesValueExistsOnSample(sample, attributeId)) {
    throw new Error(`Value of attribute '${attributeId}' missing on sample '${sample._label}', use correct preprocessing of dataset.`);
  }
};
