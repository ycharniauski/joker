import React, { useEffect } from "react";
import { Patient } from "models/Patient";
import { Phone } from "models/Phone";
import { Relative } from "models/Relative";

import PhonesRow from "../PhonesRow";

type Props = {
  patient: Patient;
  relative: Relative;
};

export default function Relatives({ patient, relative }: Props) {
  const { phones } = relative;

  return (
    <table className="phones-table">
      <thead>
        <tr className="phones-table__head-row">
          <th className="phones-table__th-id">ID</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {phones.length === 0 ? (
          <tr>
            <td colSpan={3}>No phones</td>
          </tr>
        ) : (
          phones.map((phone: Phone) => (
            <PhonesRow key={phone.id} patient={patient} phone={phone} relative={relative} />
          ))
        )}
      </tbody>
    </table>
  );
}
