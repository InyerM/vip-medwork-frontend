// Types
import { GenericResponse } from '@/types/generic-response';
import { Patient } from '@/types/patient.interface';
import { PatientHistory } from '@/types/patient-history';

// Lib
import { api } from '@/lib/axios';

export const fetchPatients = async (): Promise<Patient[]> => {
  const response = await api.get<GenericResponse<Patient[]>>('/patients');
  return response.data.data;
};

export const getPatientById = async (id: string): Promise<Patient> => {
  const response = await api.get<GenericResponse<Patient>>(`/patients/${id}`);
  return response.data.data;
};

export const getPatientStatusHistory = async (id: string): Promise<PatientHistory[]> => {
  const response = await api.get<GenericResponse<PatientHistory[]>>(`/patients/${id}/history`);
  return response.data.data;
};