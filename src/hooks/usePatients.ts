// Core
import { useQuery } from '@tanstack/react-query';

// Services
import { fetchPatients } from '../services/queries/patient.service';

export const usePatients = () => {
  return useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
  });
};