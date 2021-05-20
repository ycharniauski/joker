import { Patient } from "models/Patient";
import { Phone } from "models/Phone";
import { Relative } from "models/Relative";
import { sleep } from "utils/timeUtils";

import {
  RemoveRelativeParams,
  RemoveRelativePhoneParams,
  BackendProvider,
} from "./BackendProvider";
import { normalizePatient } from "./normalize/normalizePatient";

import rawPatients from "./patients.json";

type CreateBackendProviderParams = {
  responseDelay: number;
};

export default function createBackendProvider({
  responseDelay,
}: CreateBackendProviderParams): BackendProvider {
  let patients: Patient[] = rawPatients.map(normalizePatient);

  return {
    getPatients: async () => {
      await sleep(responseDelay);

      return patients;
    },
    removePatient: async (id: number) => {
      await sleep(responseDelay);

      patients = patients.filter((patient: Patient) => patient.id !== id);
    },
    removeRelative: async ({ id, patientId }: RemoveRelativeParams) => {
      await sleep(responseDelay);

      patients = patients.map((patient: Patient) => {
        if (patient.id !== patientId) {
          return patient;
        }
        return {
          ...patient,
          relatives: patient.relatives.filter((relative: Relative) => relative.id !== id),
        };
      });
    },
    removeRelativePhone: async ({ id, patientId, relativeId }: RemoveRelativePhoneParams) => {
      await sleep(responseDelay);

      patients = patients.map((patient: Patient) => {
        if (patient.id !== patientId) {
          return patient;
        }
        return {
          ...patient,
          relatives: patient.relatives.map((relative: Relative) => {
            if (relative.id !== relativeId) {
              return relative;
            }
            return {
              ...relative,
              phones: relative.phones.filter((phone: Phone) => phone.id !== id),
            };
          }),
        };
      });
    },
  };
}
