// Core
import { useQuery } from "@tanstack/react-query";

// Services
import { getAllStatuses } from "@/services/queries/status.service";

export const useStatuses = () => {
  return useQuery({
    queryKey: ["statuses"],
    queryFn: getAllStatuses,
  });
};
