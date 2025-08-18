import moment from "moment";

const epoch: moment.Moment = moment("1970-01-01", "YYYY-MM-DD");

export function formatDate(daysSinceEpoch: number): string {
  const e = epoch.clone();
  const date = e.add(daysSinceEpoch, "days");
  return date.format("DD MMM YY");
}

export function formatDateAsDaySinceEpoch(rawDate: string): number {
  const date = moment(rawDate, "YYYY-MM-DD");
  return Math.floor(date.diff(epoch, "days"));
}

export function formatBlogPostDate(filename: string): string {
  const date = moment(filename, "YYYYMMDD");
  return date.format("YYYY-MM-DD");
}
