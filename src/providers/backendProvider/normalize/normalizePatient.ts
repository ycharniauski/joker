import lget from "lodash/get";
import { Patient } from "models/Patient";
import { normalizeDate } from "./normalizeDate";
import { normalizeGender } from "./normalizeGender";
import { normalizeRelative } from "./normalizeRelative";

export function normalizePatient({ data, kids }: any): Patient {
  return {
    id: parseInt(data["Identification number"], 10),
    name: data.Name || "",
    gender: normalizeGender(data.Gender),
    risk: data.Risk || "",
    hairLength: parseFloat(data["Hair length"]) || undefined,
    iq: parseInt(data.IQ) || undefined,
    admissionDate: normalizeDate(data["Admission date"]),
    lastBreakdown: normalizeDate(data["Last breakdown"]),
    knowsJoker: data["Knows the Joker?"] === true,
    yearlyFee: parseFloat(data["Yearly fee"]) || undefined,
    relatives: lget(kids, "has_relatives.records", []).map(normalizeRelative),
  };
}
