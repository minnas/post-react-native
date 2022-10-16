export const shuffleArray = <T>(array: T[] | undefined): T[] | undefined => {
  if (array)
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  return undefined;
};
