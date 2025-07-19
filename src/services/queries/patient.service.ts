// Types
import { GenericResponse } from '@/types/generic-response';
import { Patient } from '@/types/patient.interface';

// Lib
import { api } from '@/lib/axios';

export const fetchPatients = async (): Promise<Patient[]> => {
  const response = await api.get<GenericResponse<Patient[]>>('/patients');
  return response.data.data;
};