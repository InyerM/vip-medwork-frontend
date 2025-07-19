// Lib
import { api } from "@/lib/axios";

// Types
import { GenericResponse } from "@/types/generic-response";
import { Provider } from "@/types/provider";

export const getAllProviders = async (): Promise<Provider[]> => {
  const res = await api.get<GenericResponse<Provider[]>>(`/providers`);
  return res.data.data;
};
