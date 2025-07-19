export interface GenericResponse<T> {
  status: string;
  timestamp: string;
  data: T;
}