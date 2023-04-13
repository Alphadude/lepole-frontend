export const timeSlots = [
  {
    id: 1,
    name: 'Off peak hours',
    time: '12:00 AM - 4:00 PM',
    fee: '2 coins/hours',
  },
  {
    id: 2,
    name: 'mid peak hours',
    time: '9:00PM - 12:00AM',
    fee: '2 coins/hours',
  },
  {
    id: 3,
    name: 'peak hours',
    time: '6:00 AM - 9:00 PM',
    fee: '2 coins/hours',
  },
];

export const activities = [
  {
    id: 1,
    type: 'purchase',
    text: 'You purchased 8 coins for £54 👍',
  },
  {
    id: 2,
    type: 'announcement',
    text: 'Announcement: 💪We are adding more gym locations',
  },
  {
    id: 3,
    type: 'reminder',
    text: 'You have an upcoming session.',
  },
];

export const upcoming = [
  {
    id: 1,
    date: '05-15-2023',
    time: '1:00 AM - 2:00 AM',
    duration: '1 hour',
    slot_name: 'Mid-Peak Session',
  },
  {
    id: 2,
    date: '05-18-2023',
    time: '1:00 AM - 2:00 AM',
    duration: '1 hour',
    slot_name: 'Off-Peak Session',
  },
  {
    id: 3,
    date: '05-20-2023',
    time: '1:00 AM - 2:00 AM',
    duration: '1 hour',
    slot_name: 'Peak Session',
  },
  {
    id: 4,
    date: '05-20-2023',
    time: '1:00 AM - 2:00 AM',
    duration: '1 hour',
    slot_name: 'Off-Peak Session',
  },
  {
    id: 5,
    date: '05-20-2023',
    time: '1:00 AM - 2:00 AM',
    duration: '1 hour',
    slot_name: 'Mid-Peak Session',
  },
];



export const offPeakSlotsData = [
  {
    id: 1,
    time: '12:00 AM'
  },
  {
    id: 2,
    time: '1:00 AM'
  },
  {
    id: 3,
    time: '2:00 AM'
  },
  {
    id: 4,
    time: '3:00 AM'
  },
]


export const midPeakSlotsData = [
  {
    id: 1,
    time: '12:00 AM'
  },
  {
    id: 2,
    time: '1:00 AM'
  },
  {
    id: 3,
    time: '2:00 AM'
  },
  {
    id: 4,
    time: '3:00 AM'
  },
]


export const peakSlotsData = [
  {
    id: 1,
    time: '12:00 AM'
  },
  {
    id: 2,
    time: '1:00 AM'
  },
  {
    id: 3,
    time: '2:00 AM'
  },
  {
    id: 4,
    time: '3:00 AM'
  },
]


export const plans = [
  {
    id: 1,
    name: 'Off PeaK',
    desc: 'The best value if you are someone that loves to have less people at the gym',
    startTime: 12,
    endTime: 4,
    fiat_price: 5,
    coin_price: 2,
    timeSlotsData: offPeakSlotsData
  },
  {
    id: 2,
    name: 'Mid Peak',
    desc: 'The best value if you are someone that loves to have less people at the gym',
    startTime: 4,
    endTime: 6,
    fiat_price: 10,
    coin_price: 2,
    timeSlotsData: midPeakSlotsData
  },
  {
    id: 3,
    name: 'PeaK',
    desc: 'The best value if you are someone that loves to have less people at the gym',
    startTime: 6,
    endTime: 9,
    fiat_price: 15,
    coin_price: 2,
    timeSlotsData: peakSlotsData
  },
]
