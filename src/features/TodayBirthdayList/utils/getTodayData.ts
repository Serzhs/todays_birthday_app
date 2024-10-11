export const getTodayData = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return {
    month,
    day,
  };
};
