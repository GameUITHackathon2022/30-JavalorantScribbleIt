export const wait = (second) => {
  return new Promise((resolve) => setTimeout(resolve, second * 1000));
};
