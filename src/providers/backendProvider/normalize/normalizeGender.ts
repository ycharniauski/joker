import { Gender } from "models/Gender";

export function normalizeGender(raw: any): Gender {
  const first = typeof raw === "string" && raw.charAt(0).toLowerCase();
  switch (first) {
    case "m":
      return Gender.MALE;
    case "f":
      return Gender.FEMALE;
    default:
      return Gender.NONE;
  }
}
