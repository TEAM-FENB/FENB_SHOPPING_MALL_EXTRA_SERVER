const getDateAfter = (number, date = new Date()) => {
  date.setDate(date.getDate() + number);

  return date;
};

module.exports = { getDateAfter };
