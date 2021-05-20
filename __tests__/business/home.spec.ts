/* global describe, it, expect */
import { Patient } from "models/Patient";
import homeReducer, {
  loadPageThunk,
  removePatientThunk,
  selectLoading,
  selectPatients,
} from "store/reducers/home/homeSlice";
import createBackendProvider from "providers/backendProvider/createBackendProvider";
import { store } from "store/store";
import injector from "utils/injector";

describe("Home reducer", () => {
  const { dispatch, getState } = store;

  injector.registerBackendProvider(createBackendProvider());

  it("loadHomeThunk test", async () => {
    await dispatch(loadPageThunk());

    expect(selectLoading(getState())).toBeFalsy();
    expect(selectPatients(getState()).length > 0).toBeTruthy();
  });

  it("removePatientThunk test", async () => {
    let patients = selectPatients(getState());
    const count = patients.length;
    const [target] = patients;
    const { id } = target;

    await dispatch(removePatientThunk(id));

    expect(selectLoading(getState())).toBeFalsy();
    patients = selectPatients(getState());
    expect(patients.length).toBe(count - 1);
    expect(patients.find((patient: Patient) => patient.id === id)).toBeFalsy();
  });
});
