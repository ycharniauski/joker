import lget from "lodash/get";
import { Relative } from "models/Relative";
import { normalizePhone } from "./normalizePhone";

export function normalizeRelative({ data, kids }: any): Relative {
  return {
    alive: data["Is alive?"] === "true",
    frequencyOfVisits: parseInt(data["Frequency of visits"], 10) || 0,
    id: parseInt(data["Relative ID"], 10),
    phones: lget(kids, "has_phone.records", []).map(normalizePhone),
  };
}
