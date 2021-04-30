

export const getMergedCountObjects = (countObjects:{ [key:string]:number }[]) => {
  const result :{ [key:string]:number } = {};
  countObjects.forEach((currentCountObject) => {
    Object.entries(currentCountObject)
      .forEach(([key, count]) => {
        if (!result[key]) {
          result[key] = 0;
        }
        result[key] += count;
      });
  });
  return result;
};
