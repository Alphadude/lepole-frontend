import moment from 'moment';

export const formatDate = (date, formatType) => {
  return moment(date).format(formatType);
};

export const isRefundEligible = (
  bookedDateString,
  refundThresholdHours = 4,
) => {
  // Get the current date and time
  const today = new Date();

  // Parse the booked date string into a Date object
  const bookedDate = new Date(bookedDateString);

  // Calculate the time difference in milliseconds
  const timeDifference = bookedDate - today;

  // Convert the time difference to hours
  const hoursDifference = timeDifference / (1000 * 60 * 60);

  // Check if the current date is less than the booked date by the specified threshold
  return hoursDifference > refundThresholdHours;
};
