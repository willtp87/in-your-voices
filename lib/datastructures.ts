// Shuffles an array.
export const shuffleArray = (arrayToShuffle: any[]) => {
  let remaining = arrayToShuffle.length;

  while (remaining) {
    const pick = Math.floor(Math.random() * remaining);
    remaining--;
    [arrayToShuffle[remaining], arrayToShuffle[pick]] = [
      arrayToShuffle[pick],
      arrayToShuffle[remaining],
    ];
  }
};

// Moves an array value up by swapping an element with the preveous index.
export const arrayValUp = (sourceArray: any[], valToUp: any) => {
  const targetIndex = sourceArray.findIndex(
    (val: any) => val.machineName === valToUp.machineName,
  );
  [sourceArray[targetIndex - 1], sourceArray[targetIndex]] = [
    sourceArray[targetIndex],
    sourceArray[targetIndex - 1],
  ];
};

// Moves an array value down by swapping an element with the next index.
export const arrayValDown = (sourceArray: any[], valToDown: any) => {
  const targetIndex = sourceArray.findIndex(
    (val: any) => val.machineName === valToDown.machineName,
  );
  [sourceArray[targetIndex + 1], sourceArray[targetIndex]] = [
    sourceArray[targetIndex],
    sourceArray[targetIndex + 1],
  ];
};
