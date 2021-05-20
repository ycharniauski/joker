/* global describe, it, expect */
import { Patient } from "models/Patient";
import { Phone } from "models/Phone";
import { Relative } from "models/Relative";
import createBackendProvider from "providers/backendProvider/createBackendProvider";

describe("backendProvider test", () => {
  const provider = createBackendProvider();

  it("Test get patients", async () => {
    const patients = await provider.getPatients();
    expect(patients.length > 0).toBeTruthy();

    patients.forEach((patient: Patient) => {
      expect(patient.id).toBeTruthy();
      expect(Array.isArray(patient.relatives)).toBeTruthy();
    });
  });

  it("Test remove patient", async () => {
    const [first] = await provider.getPatients();
    await provider.removePatient(first.id);
    const patients = await provider.getPatients();
    expect(patients.find((patient: Patient) => patient.id === first.id)).toBeFalsy();
  });

  it("Test remove patient relative", async () => {
    let patients = await provider.getPatients();

    let patient = patients.find((pat: Patient) => pat.relatives.length > 0);
    if (!patient) throw new Error("There are no patients with relatives");

    const relativesCount = patient.relatives.length;
    const patientId = patient.id;
    const [relative] = patient.relatives;

    if (!relative) throw new Error("There are no relatives");
    const { id } = relative;

    await provider.removeRelative({ id, patientId });
    patients = await provider.getPatients();

    patient = patients.find((pat: Patient) => pat.id === patientId);
    if (!patient) throw new Error("Patient not found");

    expect(patient.relatives.length).toBe(relativesCount - 1);

    expect(patient.relatives.some((rel: Relative) => rel.id === id)).toBeFalsy();
  });

  it("Test remove patient relative phone", async () => {
    let patients = await provider.getPatients();

    let patientId = 0;
    let relativeId = 0;
    let phoneId = 0;
    let phonesCount = 0;

    patients.forEach((pat: Patient) => {
      pat.relatives.forEach((rel: Relative) => {
        rel.phones.forEach((ph: Phone) => {
          if (!phoneId) {
            patientId = pat.id;
            relativeId = rel.id;
            phoneId = ph.id;
            phonesCount = rel.phones.length;
          }
        });
      });
    });

    await provider.removeRelativePhone({ id: phoneId, relativeId, patientId });
    patients = await provider.getPatients();

    let exists = false;
    let currPhonesCount = 0;

    patients.forEach((pat: Patient) => {
      pat.relatives.forEach((rel: Relative) => {
        if (pat.id === patientId && rel.id === relativeId) {
          exists = rel.phones.some((ph: Phone) => ph.id === phoneId);
          currPhonesCount = rel.phones.length;
        }
      });
    });

    expect(exists).toBeFalsy();
    expect(currPhonesCount).toBe(phonesCount - 1);
  });
});
