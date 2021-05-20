import React, { useCallback, useEffect, useState } from "react";

import BtnExpand from "components/BtnExpand";
import BtnDelete from "components/BtnDelete";
import { Patient } from "models/Patient";
import { Relative } from "models/Relative";
import { useAppDispatch } from "store/hooks";
import { removeRelativeThunk } from "store/reducers/home/homeSlice";
import { getGenderTitle } from "utils/getGenderTitle";
import { getDateTimeString } from "utils/timeUtils";

import Phones from "../Phones";

type Props = {
  patient: Patient;
  relative: Relative;
};

export default function RelativesRow({ patient, relative }: Props) {
  const { id: patientId } = patient;
  const { alive, id, frequencyOfVisits, phones } = relative;

  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const expandCallback = useCallback(() => setExpanded(!expanded), [expanded]);

  const removeCallback = useCallback(() => {
    dispatch(removeRelativeThunk({ id, patientId }));
  }, []);

  return (
    <>
      <tr className="relatives-row">
        <td>
          <BtnExpand expanded={expanded} onClick={expandCallback} />
        </td>
        <td>{id}</td>
        <td>{alive ? "true" : "false"}</td>
        <td>{frequencyOfVisits}</td>
        <td>
          <BtnDelete onClick={removeCallback} />
        </td>
      </tr>
      {expanded && (
        <tr className="relatives-row__sub">
          <td colSpan={5}>
            <Phones patient={patient} relative={relative} />
          </td>
        </tr>
      )}
    </>
  );
}
