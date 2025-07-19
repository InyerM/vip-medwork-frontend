// Core
import { useQuery } from '@tanstack/react-query';

// Services
import { getAllProviders } from '../services/queries/provider.service';

export const useProviders = () => {
  return useQuery({
    queryKey: ['providers'],
    queryFn: getAllProviders,
  });
};