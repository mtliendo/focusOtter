export const durationMap = [
  { displayName: '15 minutes', value: 900000 },
  { displayName: '30 minutes', value: 1800000 },
  { displayName: '45 minutes', value: 2700000 },
  { displayName: '1 hour', value: 3600000 },
  { displayName: '1 hour 15 minutes', value: 4500000 },
  { displayName: '1 hour 30 minutes', value: 5400000 },
  { displayName: '1 hour 45 minutes', value: 6300000 },
  { displayName: '2 hours ', value: 7200000 },
];

export const generateDisplayNameFromDuration = millseconds => {
  const foundItem = durationMap.find(
    duarationTime => duarationTime.value === millseconds
  );

  return foundItem && foundItem.displayName;
};
