import React, { useEffect } from "react";
import { Patient } from "models/Patient";

import PatientsRow from "../PatientsRow";

type Props = {
  patients: Patient[];
};

export default function Patients({ patients }: Props) {
  return (
    <table className="patients">
      <thead>
        <tr className="patients-table__head-row">
          <th className="patients-table__th-expand"></th>
          <th className="patients-table__th-id">ID</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Risk</th>
          <th>Hair len</th>
          <th>IQ</th>
          <th>Admission date</th>
          <th>Last breakdown</th>
          <th>Yearly fee</th>
          <th>Knows Jocker</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient: Patient) => (
          <PatientsRow key={patient.id} patient={patient} />
        ))}
      </tbody>
    </table>
  );
}
