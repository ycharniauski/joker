/* global describe, it, expect */
import { Patient } from "models/Patient";
import { Phone } from "models/Phone";
import { Relative } from "models/Relative";
import createBackendProvider from "providers/backendProvider/createBackendProvider";

describe("backendProvider test", () => {
  const provider = createBackendProvider({ responseDelay: 0 });

  it("Test get patients, check data consistance", async () => {
    const patients = await provider.getPatients();
    expect(patients.length > 0).toBeTruthy();

    patients.forEach((patient: Patient) => {
      expect(patient.id).toBeTruthy();
      expect(Array.isArray(patient.relatives)).toBeTruthy();

      patient.relatives.forEach((relative: Relative) => {
        expect(relative.id).toBeTruthy();
        expect(Array.isArray(relative.phones)).toBeTruthy();

        relative.phones.forEach((phone: Phone) => {
          expect(phone.id).toBeTruthy();
        });
      });
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

    let patientId = 0;
    let relativeId = 0;
    let relativesCount = 0;

    patients.forEach((pat: Patient) => {
      pat.relatives.forEach((rel: Relative) => {
        if (!relativeId) {
          patientId = pat.id;
          relativeId = rel.id;
          relativesCount = pat.relatives.length;
        }
      });
    });

    await provider.removeRelative({ id: relativeId, patientId });
    patients = await provider.getPatients();

    let exists = false;
    let currRelativesCount = 0;

    patients.forEach((pat: Patient) => {
      if (pat.id === patientId) {
        exists = pat.relatives.some((rel: Relative) => rel.id === relativeId);
        currRelativesCount = pat.relatives.length;
      }
    });

    expect(exists).toBeFalsy();
    expect(currRelativesCount).toBe(relativesCount - 1);
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
