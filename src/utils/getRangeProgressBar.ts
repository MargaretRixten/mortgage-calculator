export const getRangeProgressBar = (
  value: number,
  min: number,
  max: number
) => {
  return ((value - min) / (max - min)) * 100;
};
