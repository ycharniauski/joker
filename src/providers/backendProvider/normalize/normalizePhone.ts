import { Phone } from "models/Phone";

export function normalizePhone({ data }: any): Phone {
  return {
    id: parseInt(data["Phone ID"]),
    phone: data.Phone || "",
  };
}
