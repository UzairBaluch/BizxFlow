const date = () => {
  let startDay = new Date();
  let endDay = new Date();
  startDay.setHours(0, 0, 0, 0);
  endDay.setHours(23, 59, 59, 999);
  return { startDay, endDay };
};

export { date };
