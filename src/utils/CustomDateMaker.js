const dateRange = (from,to) => {
    let startDate;
    let endDate;
    if (from && to) {
         startDate = new Date(from);
         endDate = new Date(to);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        return { startDate, endDate };
    } else{
        startDate = new Date();
        endDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999)};
        return { startDate, endDate };
};

export { dateRange };
