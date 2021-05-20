import moment from "moment";

export function normalizeDate(raw: any): string {
  if (!raw) return "";
  const m = moment.utc(raw, "ddd MMM D HH:mm:ss ZZ YYYY");
  return m.toISOString() || "";
}
