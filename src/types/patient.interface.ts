import { Provider } from "./provider";
import { Status } from "./status";

export interface Patient {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  providerId: string | null;
  statusId: string | null;
  createdAt: string;
  provider: Provider;
  status: Status;
}