import cn from "classnames";
import React, { useEffect, useCallback } from "react";

import Loader from "components/Loader";
import { Patient } from "models/Patient";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { loadPageThunk, selectLoading, selectPatients } from "store/reducers/home/homeSlice";

import Patients from "./Patients";

export default function Home() {
  const patients = useAppSelector(selectPatients);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPageThunk());
  }, []);

  return (
    <div className={cn("home-page", { "home-page__loading": loading })}>
      <h1>Home</h1>
      {loading && <Loader />}
      <div className="home-page__content">
        <Patients patients={patients} />
      </div>
    </div>
  );
}
