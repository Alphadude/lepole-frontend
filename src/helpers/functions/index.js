import moment from 'moment';

export const formatDate = (date, formatType) => {
  return moment(date).format(formatType);
};
