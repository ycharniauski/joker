import { Phone } from "models/Phone";

export type Relative = {
  alive: boolean;
  frequencyOfVisits: number;
  id: number;
  phones: Phone[];
};
