'use client';
// Core
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

// Services
import { assignProviderToPatient } from '@/services/commands/patient.service';
import { getAllProviders } from '@/services/queries/provider.service';

// Types
import { Provider } from '@/types/provider';

interface AssignProviderModalProps {
  patientId: string;
  onClose: () => void;
  isOpen: boolean;
}

export default function AssignProviderModal({ patientId, onClose, isOpen }: AssignProviderModalProps) {
  const queryClient = useQueryClient();

  const { data: providers } = useQuery({
    queryKey: ['providers'],
    queryFn: async () => {
      const res = await getAllProviders();
      return res;
    },
    enabled: isOpen,
  });

  const mutation = useMutation({
    mutationFn: (providerId: string) => assignProviderToPatient(patientId!, providerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['patient', patientId] });
      onClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      providerId: '',
    },
    onSubmit: (values) => {
      mutation.mutate(values.providerId);
    },
  });

  useEffect(() => {
    if (!isOpen) formik.resetForm();
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-lg bg-white dark:bg-gray-900 p-6 shadow-lg border border-gray-700">
          <DialogTitle className="text-lg font-semibold mb-4">Assign Provider</DialogTitle>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="providerId" className="block text-sm font-medium text-gray-200">
                Select Provider
              </label>
              <select
                name="providerId"
                id="providerId"
                className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white p-2"
                value={formik.values.providerId}
                onChange={formik.handleChange}
                required
              >
                <option value="">Select one</option>
                {providers?.map((provider: Provider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md border border-gray-600 text-gray-200 hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                Assign
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}