import React, { useCallback, useEffect, useState } from "react";

import BtnDelete from "components/BtnDelete";
import { Patient } from "models/Patient";
import { Phone } from "models/Phone";
import { Relative } from "models/Relative";
import { useAppDispatch } from "store/hooks";
import { removeRelativePhoneThunk } from "store/reducers/home/homeSlice";
import { getGenderTitle } from "utils/getGenderTitle";
import { getDateTimeString } from "utils/timeUtils";

type Props = {
  patient: Patient;
  phone: Phone;
  relative: Relative;
};

export default function PhonesRow({ patient, phone, relative }: Props) {
  const { id: patientId } = patient;
  const { id: relativeId } = relative;
  const { id, phone: phoneNumber } = phone;

  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const removeCallback = useCallback(() => {
    dispatch(removeRelativePhoneThunk({ id, patientId, relativeId }));
  }, []);

  return (
    <tr className="relatives-row">
      <td>{id}</td>
      <td>{phoneNumber}</td>
      <td>
        <BtnDelete onClick={removeCallback} />
      </td>
    </tr>
  );
}
