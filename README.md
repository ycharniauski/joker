
### Scripts ([package.json](./package.json))

- `npm run start`: run application
- `npm run lint`: executes linter
- `npm run test`: executes tests

### IoC container

We can inject any object insted of backend provider. It can be a real object that makes real http request, or it can be a mock.
We even can mock just a single method of a provider to make tests:

```javascript
  injector.registerBackendProvider({
    ...createBackendProvider(),
    getPatients: () => { reutrn [some fake data] },
  })
```

or we can apply a wrapper pattern to make a cache:

```javascript
  function createHttpProviderWithCache(): BackendProvider {
    const provider = createHttpBackendProvider();
    let patients: ?Patient[];
    return {
      getPatients: () => {
        if (!patinets) {
          patinets = provider.getPatients();
        }
        return patinets;
      }
      removePatient: (id: number) => {
        patinents = undfined;
        provider.removePatients(id)
      }
    }
  }
```

### TDD approach

I had implmeneted Thunks and tests first, before I had started to work with UI. Also we have a fake data provider. 
It means that we can test solution with fake data first, and then create some Http Provider and make end to end test to test it on real environment.

### Redux. No logic on UI

Put all logic to thunks and utils. In the same time I had tried to avoid dispatch actions directly from UI.
I even don't export Redux actions. If we use thunks only we can write a tests in declarative way. For instance:

```javascript
  test('', () => {
    await dispatch(loginThunk({ email,  password }));
    expect(getState().profile.email).toEqual(email);

    await dispatch(loadHomeThunk());
    expect(getState().home.patients.length > 0).toBeTruth());

    await dispatch(removePatient(id))
    expect(getState().home.patients.find(patient => patient.id === id)).toBeFalsy();
  })
```

Test is emulating UI job and user actions.