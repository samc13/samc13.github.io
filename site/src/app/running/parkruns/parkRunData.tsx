export type ParkRun = {
  eventName: string;
  date: string; // Format "YYYY-MM-DD"
  position: number;
  time: string; // Format "MM:SS"
};

const parkRunData: ParkRun[] = [
  {
    eventName: "Roundhay",
    date: "2025-07-19",
    position: 104,
    time: "25:29",
  },
  {
    eventName: "Roundhay",
    date: "2025-06-28",
    position: 102,
    time: "26:17",
  },
  {
    eventName: "Roundhay",
    date: "2025-03-15",
    position: 54,
    time: "23:56",
  },
  {
    eventName: "Roundhay",
    date: "2024-11-02",
    position: 57,
    time: "23:08",
  },
  {
    eventName: "Roundhay",
    date: "2024-10-12",
    position: 166,
    time: "28:23",
  },
  {
    eventName: "Roundhay",
    date: "2023-11-18",
    position: 46,
    time: "23:40",
  },
  {
    eventName: "ChevinForest",
    date: "2024-09-28",
    position: 30,
    time: "24:35",
  },
  {
    eventName: "ChevinForest",
    date: "2023-10-07",
    position: 11,
    time: "24:02",
  },
  {
    eventName: "MileEnd",
    date: "2024-11-09",
    position: 66,
    time: "21:34",
  },
  {
    eventName: "MileEnd",
    date: "2020-01-04",
    position: 31,
    time: "20:19",
  },
  {
    eventName: "MileEnd",
    date: "2019-08-24",
    position: 58,
    time: "22:06",
  },
  {
    eventName: "MileEnd",
    date: "2019-08-03",
    position: 33,
    time: "20:20",
  },
  {
    eventName: "MileEnd",
    date: "2019-07-20",
    position: 51,
    time: "21:46",
  },
  {
    eventName: "ArrowValley",
    date: "2024-10-05",
    position: 52,
    time: "22:14",
  },
  {
    eventName: "ArrowValley",
    date: "2024-06-22",
    position: 46,
    time: "22:17",
  },
];

export default parkRunData;
