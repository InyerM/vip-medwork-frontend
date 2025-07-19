import { Patient } from "./patient.interface";
import { Status } from "./status";

export interface PatientHistory {
  patient: Patient;
  status: Status;
  changedAt: string;
}