import { Gender } from "models/Gender";
import { Relative } from "models/Relative";

export type Patient = {
  admissionDate: string;
  gender: Gender;
  hairLength?: number;
  id: number;
  iq?: number;
  knowsJoker: boolean;
  lastBreakdown: string;
  name: string;
  relatives: Relative[];
  risk: string;
  yearlyFee?: number;
};
