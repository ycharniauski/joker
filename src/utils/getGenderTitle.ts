import { Gender } from "models/Gender";

export function getGenderTitle(gender: Gender): string {
  switch (gender) {
    case Gender.MALE:
      return "Male";
    case Gender.FEMALE:
      return "Female";
    default:
      return "";
  }
}
