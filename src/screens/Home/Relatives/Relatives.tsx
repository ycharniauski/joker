import React, { useEffect } from "react";
import { Patient } from "models/Patient";
import { Relative } from "models/Relative";

import RelativesRow from "../RelativesRow";

type Props = {
  patient: Patient;
};

export default function Relatives({ patient }: Props) {
  const { relatives } = patient;

  return (
    <table className="relatives-table">
      <thead>
        <tr className="relatives-table__head-row">
          <th className="relatives-table__th-expand"></th>
          <th className="relatives-table__th-id">ID</th>
          <th>Is Alive?</th>
          <th>Frequency of visits</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {relatives.length === 0 ? (
          <td colSpan={5}>No relatives</td>
        ) : (
          relatives.map((relative: Relative) => (
            <RelativesRow key={relative.id} patient={patient} relative={relative} />
          ))
        )}
      </tbody>
    </table>
  );
}
