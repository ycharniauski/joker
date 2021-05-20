import { BackendProvider } from "../providers/backendProvider/BackendProvider";

let backendProvider: BackendProvider;

export default {
  getBackendProvider: (): BackendProvider => {
    return backendProvider;
  },
  registerBackendProvider: (instance: BackendProvider) => {
    backendProvider = instance;
  },
};
