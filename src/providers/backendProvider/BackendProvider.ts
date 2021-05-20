import { Patient } from "models/Patient";

export type RemoveRelativeParams = {
  id: number;
  patientId: number;
};

export type RemoveRelativePhoneParams = {
  id: number;
  patientId: number;
  relativeId: number;
};

export type BackendProvider = {
  getPatients(): Promise<Patient[]>;
  removeRelative(params: RemoveRelativeParams): Promise<void>;
  removePatient(id: number): Promise<void>;
  removeRelativePhone(params: RemoveRelativePhoneParams): Promise<void>;
};
