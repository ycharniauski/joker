import React, { useCallback, useEffect, useState } from "react";

import BtnExpand from "components/BtnExpand";
import BtnDelete from "components/BtnDelete";
import { Patient } from "models/Patient";
import { useAppDispatch } from "store/hooks";
import { removePatientThunk } from "store/reducers/home/homeSlice";
import { getGenderTitle } from "utils/getGenderTitle";
import { getDateTimeString } from "utils/timeUtils";

import Relatives from "../Relatives";

type Props = {
  patient: Patient;
};

export default function PatientsRow({ patient }: Props) {
  const {
    admissionDate,
    id,
    iq,
    gender,
    hairLength,
    knowsJoker,
    lastBreakdown,
    name,
    risk,
    yearlyFee,
  } = patient;
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const expandCallback = useCallback(() => setExpanded(!expanded), [expanded]);

  const removePatientCallback = useCallback(() => {
    dispatch(removePatientThunk(id));
  }, []);

  return (
    <>
      <tr className="patients-row">
        <td>
          <BtnExpand expanded={expanded} onClick={expandCallback} />
        </td>
        <td>{id}</td>
        <td>{name}</td>
        <td>{getGenderTitle(gender)}</td>
        <td>{risk}</td>
        <td>{hairLength ? hairLength.toFixed(2) : "-"}</td>
        <td>{iq}</td>
        <td>{getDateTimeString(admissionDate)}</td>
        <td>{getDateTimeString(lastBreakdown)}</td>
        <td>{yearlyFee}</td>
        <td>{knowsJoker ? "true" : "false"}</td>
        <td>
          <BtnDelete onClick={removePatientCallback} />
        </td>
      </tr>
      {expanded && (
        <tr className="patients-row__sub">
          <td colSpan={12}>
            <Relatives patient={patient} />
          </td>
        </tr>
      )}
    </>
  );
}
