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
