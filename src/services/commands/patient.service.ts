import { api } from '@/lib/axios';
import { GenericResponse } from '@/types/generic-response';
import { Patient } from '@/types/patient.interface';

export const assignProviderToPatient = async (
  patientId: string,
  providerId: string,
): Promise<GenericResponse<null>> => {
  const { data } = await api.patch<GenericResponse<null>>(
    `/patients/${patientId}/provider`,
    { providerId },
  );
  return data;
};

export const createPatient = async (patientData: Partial<Patient>): Promise<GenericResponse<Patient>> => {
  const { data } = await api.post<GenericResponse<Patient>>(`/patients`, patientData);
  return data;
};

export const updatePatientStatus = async (data: { patientId: string; statusId: string }): Promise<void> => {
  await api.patch<void>(`/patients/${data.patientId}/status`, { statusId: data.statusId });
};

export const removeProviderFromPatient = async (patientId: string): Promise<void> => {
  await api.patch<void>(`/patients/${patientId}/unassign-provider`);
};