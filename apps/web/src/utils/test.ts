import data from "./__write__/all-reviews.json";

const manipulate = data.reviews.map(v => {
  const toTimeStamp = v.created.concat(":00.000Z");
  const toUnix = new Date(toTimeStamp).valueOf();
  return [toTimeStamp, toUnix] as const;
});

console.log(manipulate);
