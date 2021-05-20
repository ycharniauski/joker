import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clone } from "lodash";
import { Patient } from "models/Patient";
import { RootState, AppThunk } from "store/store";
import injector from "utils/injector";
import { logError } from "utils/logger";
import { toasterError } from "utils/toaster";

export interface HomeState {
  loading: boolean;
  patients: Patient[];
}

export const initialState: HomeState = {
  patients: [],
  loading: false,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setPatients: (state, action: PayloadAction<Patient[]>) => {
      state.patients = clone(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

const { setPatients, setLoading } = homeSlice.actions;

// ----------------------- Selectors ---------------------------

export const selectLoading = (state: RootState): boolean => state.home.loading;
export const selectPatients = (state: RootState): Patient[] => state.home.patients;

// ----------------------- Thunks ---------------------------

export const loadPageThunk = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const provider = injector.getBackendProvider();
    const patients = await provider.getPatients();
    dispatch(setPatients(patients));
  } catch (error) {
    logError(error);
    toasterError("Sorry, error happend on loading patients");
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const removePatientThunk =
  (id: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const provider = injector.getBackendProvider();
      await provider.removePatient(id);
      const patients = await provider.getPatients();
      dispatch(setPatients(patients));
    } catch (error) {
      logError(error);
      toasterError("Sorry, error happend on removing patient");
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

type RemoveRelativeThunkParams = {
  id: number;
  patientId: number;
};

export const removeRelativeThunk =
  ({ id, patientId }: RemoveRelativeThunkParams): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const provider = injector.getBackendProvider();
      await provider.removeRelative({ id, patientId });
      const patients = await provider.getPatients();
      dispatch(setPatients(patients));
    } catch (error) {
      logError(error);
      toasterError("Sorry, error happend on removing relative");
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

type RemoveRelativePhoneThunkParams = {
  id: number;
  patientId: number;
  relativeId: number;
};

export const removeRelativePhoneThunk =
  ({ id, patientId, relativeId }: RemoveRelativePhoneThunkParams): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const provider = injector.getBackendProvider();
      await provider.removeRelativePhone({ id, patientId, relativeId });
      const patients = await provider.getPatients();
      dispatch(setPatients(patients));
    } catch (error) {
      logError(error);
      toasterError("Sorry, error happend on removing phone");
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

export default homeSlice.reducer;
