import moment from "moment";

const UI_DATE_FORMAT = "DD/MM/YYYY";
const UI_DATE_TIME_FORMAT = "DD/MM/YYYY H:mm";

export function getDateString(date: string): string {
  if (!date) return "";
  return moment(date).format(UI_DATE_FORMAT);
}

export function getDateTimeString(date: string): string {
  if (!date) return "";
  return moment(date).format(UI_DATE_TIME_FORMAT);
}

export function sleep(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
