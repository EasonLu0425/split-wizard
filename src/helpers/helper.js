import moment from "moment";

export const formatDate = (rawDate) => {
  const formattedDate = moment(rawDate).format('YYYY-MM-DD')
  
  return formattedDate
};
