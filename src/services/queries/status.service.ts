// Types
import { GenericResponse } from '@/types/generic-response';
import { Status } from '@/types/status';

// Lib
import { api } from '@/lib/axios';

export const getAllStatuses = async (): Promise<Status[]> => {
  const res = await api.get<GenericResponse<Status[]>>('/statuses');
  return res.data.data;
};