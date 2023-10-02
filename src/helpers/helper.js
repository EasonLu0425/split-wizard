import moment from "moment";

export const formatDate = (rawDate) => {
  const formattedDate = moment(rawDate).format('YYYY-MM-DD')
  
  return formattedDate
};

export const formatTime = (rawTime) => {
  const formattedTime = moment(rawTime).format("HH:mm:ss");
  return formattedTime
}