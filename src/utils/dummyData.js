import { formatTime } from "../screens/dashboard/session/BookNew";

export const timeSlots = [
  {
    id: 1,
    name: 'Off peak hours',
    time: '12:00 AM - 4:00 AM',
    fee: '2 coins/hours',
  },
  {
    id: 2,
    name: 'mid peak hours',
    time: '4:00AM - 6:00PM',
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
    date: '2023-05-15T10:27:18.869Z',
    time: '1:00 AM - 2:00 AM',
    duration: '1 hour',
    slot_name: 'Mid-Peak Session',
  },
  {
    id: 2,
    date: '2023-05-18T10:27:18.869Z',
    time: '1:00 AM - 2:00 AM',
    duration: '1 hour',
    slot_name: 'Off-Peak Session',
  },
  {
    id: 3,
    date: '2023-05-20T10:27:18.869Z',
    time: '1:00 AM - 2:00 AM',
    duration: '1 hour',
    slot_name: 'Peak Session',
  },
  {
    id: 4,
    date: '2023-05-20T10:27:18.869Z',
    time: '1:00 AM - 2:00 AM',
    duration: '1 hour',
    slot_name: 'Off-Peak Session',
  },
  {
    id: 5,
    date: '2023-05-20T10:27:18.869Z',
    time: '1:00 AM - 2:00 AM',
    duration: '1 hour',
    slot_name: 'Mid-Peak Session',
  },
];



export const offPeakSlotsData = [
  {
    id: 1,
    time: '12:00 AM',
  },
  {
    id: 2,
    time: '1:00 AM',
  },
  {
    id: 3,
    time: '2:00 AM',
  },
  {
    id: 4,
    time: '3:00 AM',
  },
];


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
    name: 'Morning',
    desc: 'The best value if you are someone that loves to have less people at the gym',
    startTime: 6,
    endTime: 12,
    fiat_price: 15,
    coin_price: 2,
    // timeSlotsData: offPeakSlotsData
  },
  {
    id: 2,
    name: 'Afternoon',
    desc: 'The best value if you are someone that loves to have less people at the gym',
    startTime: 12,
    endTime: 18,
    fiat_price: 15,
    coin_price: 2,
    // timeSlotsData: midPeakSlotsData
  },
  {
    id: 3,
    name: 'Evening',
    desc: 'The best value if you are someone that loves to have less people at the gym',
    startTime: 18,
    endTime: 0,
    fiat_price: 15,
    coin_price: 2,
    // timeSlotsData: peakSlotsData
  },
]
  ;

export const notifications = [
  {
    id: 1,
    type: 'wallet',
    text: 'You purchased 8 coins for £54 👍',
    timeStamp: '2023-04-15T10:27:18.869Z',
    seen: false,
  },
  {
    id: 2,
    type: 'reminder',
    text: 'You have an upcoming session.',
    timeStamp: '2023-04-14T11:27:18.869Z',
    seen: false,
  },
  {
    id: 3,
    type: 'announcement',
    text: 'Announcement: 💪We are adding more gym locations',
    timeStamp: '2023-04-13T11:27:18.869Z',
    seen: true,
  },
  {
    id: 4,
    type: 'wallet',
    text: 'You purchased 4 coins for £60 👍',
    timeStamp: '2023-04-13T11:27:18.869Z',
    seen: false,
  },
  {
    id: 5,
    type: 'announcement',
    text: 'Announcement: 💪We are adding more gym locations',
    timeStamp: '2023-04-12T11:27:18.869Z',
    seen: true,
  },

  {
    id: 6,
    type: 'reminder',
    text: 'You have an upcoming session.',
    timeStamp: '2023-04-12T11:27:18.869Z',
    seen: false,
  },
  {
    id: 7,
    type: 'reminder',
    text: 'You have an upcoming session.',
    timeStamp: '2023-04-10T11:27:18.869Z',
    seen: true,
  },
  {
    id: 8,
    type: 'wallet',
    text: 'You purchased 8 coins for £54 👍',
    timeStamp: '2023-04-09T11:27:18.869Z',
    seen: true,
  },
];

export const transactionHistory = [
  {
    title: 'Coin Bundle Purchase',
    description: '25 Mar 2023    10:48 GMT',
    amount: '€ 225',
    date: '9th March, 2023',
    status: 'Coin Balance',
  },
  {
    title: 'Session Booking',
    description: '25 Mar 2023    10:48 GMT',
    amount: '€ 15',
    date: '9th March, 2023',
    status: 'Debit Card',
  },
  {
    title: 'Coin Bundle Purchase',
    description: '25 Mar 2023    10:48 GMT',
    amount: '€ 225',
    date: '9th March, 2023',
    status: 'Debit Card',
  },
  {
    title: 'Session Booking',
    description: '25 Mar 2023    10:48 GMT',
    amount: '€ 15',
    date: '9th March, 2023',
    status: 'Debit Card',
  },
];

export const allTransactions = [
  {
    title: 'Coin Bundle Purchase',
    description: '25 Mar 2023    10:48 GMT',
    amount: '€ 225',
    date: '9th March, 2023',
    status: 'Coin Balance',
  },
  {
    title: 'Session Booking',
    description: '25 Mar 2023    10:48 GMT',
    amount: '€ 15',
    date: '9th March, 2023',
    status: 'Debit Card',
  },
  {
    title: 'Coin Bundle Purchase',
    description: '25 Mar 2023    10:48 GMT',
    amount: '€ 225',
    date: '9th March, 2023',
    status: 'Debit Card',
  },
  {
    title: 'Session Booking',
    description: '25 Mar 2023    10:48 GMT',
    amount: '€ 15',
    date: '9th March, 2023',
    status: 'Debit Card',
  },
  {
    title: 'Coin Bundle Purchase',
    description: '25 Mar 2023    10:48 GMT',
    amount: '€ 225',
    date: '9th March, 2023',
    status: 'Coin Balance',
  },
  {
    title: 'Session Booking',
    description: '25 Mar 2023    10:48 GMT',
    amount: '€ 15',
    date: '9th March, 2023',
    status: 'Debit Card',
  },
  {
    title: 'Coin Bundle Purchase',
    description: '25 Mar 2023    10:48 GMT',
    amount: '€ 225',
    date: '9th March, 2023',
    status: 'Debit Card',
  },
  {
    title: 'Session Booking',
    description: '25 Mar 2023    10:48 GMT',
    amount: '€ 15',
    date: '9th March, 2023',
    status: 'Debit Card',
  },
  {
    title: 'Coin Bundle Purchase',
    description: '25 Mar 2023    10:48 GMT',
    amount: '€ 225',
    date: '9th March, 2023',
    status: 'Coin Balance',
  },
  {
    title: 'Session Booking',
    description: '25 Mar 2023    10:48 GMT',
    amount: '€ 15',
    date: '9th March, 2023',
    status: 'Debit Card',
  },
  {
    title: 'Coin Bundle Purchase',
    description: '25 Mar 2023    10:48 GMT',
    amount: '€ 225',
    date: '9th March, 2023',
    status: 'Debit Card',
  },
  {
    title: 'Session Booking',
    description: '25 Mar 2023    10:48 GMT',
    amount: '€ 15',
    date: '9th March, 2023',
    status: 'Debit Card',
  },
];

export const bundle = [
  {
    id: 1,
    type: 'less-coins',
    coins: '8 coins',
    amount: '£54',
  },
  {
    id: 2,
    type: 'less-coins',
    coins: '16 coins',
    amount: '£104',
  },
  {
    id: 3,
    type: 'less-coins',
    coins: '24 coins',
    amount: '£150',
  },
  {
    id: 4,
    type: 'more-coins',
    coins: '32 coins',
    amount: '£189',
  },
  {
    id: 5,
    type: 'more-coins',
    coins: '40 coins',
    amount: '£225',
  },
  {
    id: 6,
    type: 'more-coins',
    coins: '48 coins',
    amount: '£264',
  },

];
