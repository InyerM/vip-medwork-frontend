import { Provider } from "@/types/provider";
import { api } from "@/lib/axios";
import { GenericResponse } from "@/types/generic-response";

export const createProvider = async (providerData: Partial<Provider>): Promise<GenericResponse<Provider>> => {
  const { data } = await api.post<GenericResponse<Provider>>(`/providers`, providerData);
  return data;
};