export type StravaRun = {
    date: string,
    distance: number,
    time: string,
    pace: string
};

const stravaData: StravaRun[] = [
    {
        date: "2025-07-19",
        distance: 5.02,
        time: "25:27",
        pace: "5:04"
    },
    {
        date: "2025-07-18",
        distance: 8.37,
        time: "49:17",
        pace: "5:53"
    },
    {
        date: "2025-07-16",
        distance: 10.62,
        time: "1:02:22",
        pace: "5:52"
    },
    {
        date: "2025-07-13",
        distance: 10.57,
        time: "1:03:59",
        pace: "6:03"
    },
    {
        date: "2025-07-12",
        distance: 5.10,
        time: "22:51",
        pace: "4:29"
    },
    {
        date: "2025-07-10",
        distance: 7.58,
        time: "46:41",
        pace: "6:09"
    },
    {
        date: "2025-07-08",
        distance: 8.35,
        time: "45:07",
        pace: "5:24"
    },
    {
        date: "2025-07-07",
        distance: 6.69,
        time: "41:32",
        pace: "6:12"
    },
    {
        date: "2025-07-04",
        distance: 6.53,
        time: "37:03",
        pace: "5:40"
    },
    {
        date: "2025-07-02",
        distance: 5.75,
        time: "26:09",
        pace: "4:33"
    },
    {
        date: "2025-06-30",
        distance: 9.45,
        time: "53:43",
        pace: "5:41"
    },
    {
        date: "2025-06-28",
        distance: 6.71,
        time: "36:27",
        pace: "5:26"
    },
    {
        date: "2025-06-26",
        distance: 8.22,
        time: "47:41",
        pace: "5:48"
    },
    {
        date: "2025-06-25",
        distance: 5.71,
        time: "30:47",
        pace: "5:23"
    },
    {
        date: "2025-06-23",
        distance: 6.89,
        time: "38:36",
        pace: "5:36"
    },
    {
        date: "2025-06-12",
        distance: 5.49,
        time: "28:14",
        pace: "5:09"
    },
    {
        date: "2025-06-02",
        distance: 3.79,
        time: "19:50",
        pace: "5:14"
    },
    {
        date: "2025-05-21",
        distance: 2.32,
        time: "12:32",
        pace: "5:23"
    },
    {
        date: "2025-05-18",
        distance: 1.67,
        time: "10:15",
        pace: "6:06"
    },
    {
        date: "2025-04-19",
        distance: 6.41,
        time: "36:45",
        pace: "5:44"
    },
    {
        date: "2025-04-18",
        distance: 1.28,
        time: "7:24",
        pace: "5:46"
    },
    {
        date: "2025-04-18",
        distance: 7.49,
        time: "40:31",
        pace: "5:25"
    },
    {
        date: "2025-04-17",
        distance: 12.46,
        time: "1:07:34",
        pace: "5:25"
    },
    {
        date: "2025-04-11",
        distance: 10.29,
        time: "52:50",
        pace: "5:08"
    },
    {
        date: "2025-04-09",
        distance: 12.44,
        time: "1:07:59",
        pace: "5:28"
    },
    {
        date: "2025-04-03",
        distance: 15.24,
        time: "1:30:26",
        pace: "5:56"
    },
    {
        date: "2025-04-02",
        distance: 11.4,
        time: "58:51",
        pace: "5:10"
    },
    {
        date: "2025-03-30",
        distance: 6.43,
        time: "36:45",
        pace: "5:43"
    },
    {
        date: "2025-03-28",
        distance: 8.35,
        time: "41:12",
        pace: "4:56"
    },
    {
        date: "2025-03-25",
        distance: 8.63,
        time: "47:36",
        pace: "5:31"
    },
    {
        date: "2025-03-23",
        distance: 7.29,
        time: "44:10",
        pace: "6:03"
    },
    {
        date: "2025-03-21",
        distance: 6.31,
        time: "32:59",
        pace: "5:13"
    },
    {
        date: "2025-03-19",
        distance: 8.38,
        time: "47:50",
        pace: "5:42"
    },
    {
        date: "2025-03-15",
        distance: 5.01,
        time: "24:23",
        pace: "4:52"
    },
    {
        date: "2025-03-14",
        distance: 10.48,
        time: "53:26",
        pace: "5:06"
    },
    {
        date: "2025-03-12",
        distance: 6.37,
        time: "39:20",
        pace: "6:10"
    },
    {
        date: "2025-03-11",
        distance: 10.77,
        time: "53:02",
        pace: "4:55"
    },
    {
        date: "2025-03-09",
        distance: 10.33,
        time: "1:02:21",
        pace: "6:02"
    },
    {
        date: "2025-03-08",
        distance: 5.98,
        time: "37:42",
        pace: "6:18"
    },
    {
        date: "2025-03-07",
        distance: 8.22,
        time: "45:06",
        pace: "5:29"
    },
    {
        date: "2025-03-05",
        distance: 7.82,
        time: "44:36",
        pace: "5:42"
    },
    {
        date: "2025-03-02",
        distance: 8.22,
        time: "47:50",
        pace: "5:49"
    },
    {
        date: "2025-02-22",
        distance: 1.15,
        time: "8:07",
        pace: "7:04"
    },
    {
        date: "2025-02-22",
        distance: 11.12,
        time: "59:45",
        pace: "5:22"
    },
    {
        date: "2025-02-19",
        distance: 7.82,
        time: "44:40",
        pace: "5:43"
    },
    {
        date: "2025-02-18",
        distance: 7.16,
        time: "40:15",
        pace: "5:37"
    },
    {
        date: "2025-02-14",
        distance: 6.77,
        time: "33:47",
        pace: "4:59"
    },
    {
        date: "2025-02-11",
        distance: 8.13,
        time: "44:54",
        pace: "5:31"
    },
    {
        date: "2025-01-31",
        distance: 12.12,
        time: "1:08:01",
        pace: "5:37"
    },
    {
        date: "2025-01-29",
        distance: 8.16,
        time: "45:51",
        pace: "5:37"
    },
    {
        date: "2025-01-23",
        distance: 8.50,
        time: "50:05",
        pace: "5:53"
    },
    {
        date: "2025-01-22",
        distance: 7.81,
        time: "48:11",
        pace: "6:10"
    },
    {
        date: "2025-01-13",
        distance: 5.41,
        time: "29:29",
        pace: "5:27"
    },
    {
        date: "2025-01-01",
        distance: 4.57,
        time: "35:01",
        pace: "7:39"
    },
];

export default stravaData;