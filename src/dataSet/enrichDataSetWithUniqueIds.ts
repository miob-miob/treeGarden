/* eslint-disable no-underscore-dangle */
import { v4 as uuidV4 } from 'uuid';
import { TreeGardenDataSample } from './set';

export const enrichDataSetWithUniqueIds = (dataSet:TreeGardenDataSample[]) => {
  const alreadyFoundIds = new Set();
  let forcedToAddOurIds = false;
  dataSet.forEach((sample) => {
    if (sample._id === undefined) {
      // eslint-disable-next-line no-param-reassign
      sample._id = uuidV4();
      forcedToAddOurIds = true;
    }
    if (alreadyFoundIds.has(sample._id)) {
      throw new Error(`When calling 'getDataSetWithUniqueIds', _id of sample must be unique! Sample with label '${sample._label}' has not unique id: '${sample._id}'`);
    }
    alreadyFoundIds.add(sample._id);
  });
  if (forcedToAddOurIds) {
    console.warn('Every sample in data set did not have _id, we were forced to add UUID4 to each of those - your data set was mutated - now you at least know.');
  }
};
