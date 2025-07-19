// Core
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

// Services
import { getPatientById } from "@/services/queries/patient.service";
import {
  updatePatientStatus,
  removeProviderFromPatient,
} from "@/services/commands/patient.service";
import { getPatientStatusHistory } from "@/services/queries/patient.service";

// UI
import StatusDropdown from "@/components/StatusDropdown";
import AssignProviderModal from "@/components/AssignProviderModal";
import Button from "@/components/Button";

// Store
import { usePatientModalStore } from "@/store/patient-modal.store";

// Hooks
import { useStatuses } from "@/hooks/useStatuses";

// Lib
import { queryClient } from "@/lib/react-query";

// UI
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function PatientDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { patientId, setPatientId } = usePatientModalStore();

  const { data: statuses } = useStatuses();

  const {
    data: patient,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["patient", id],
    queryFn: () => getPatientById(id as string),
    enabled: !!id,
  });

  const { data: history } = useQuery({
    queryKey: ["patient-history", id],
    queryFn: () => getPatientStatusHistory(id as string),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: updatePatientStatus,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["patient", id] }),
  });

  const handleStatusChange = (statusId: string) => {
    if (!id) return;
    mutation.mutate({ patientId: id as string, statusId });
  };

  const mutationRemoveProvider = useMutation({
    mutationFn: removeProviderFromPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient", id] });
    },
  });

  const handleRemoveProvider = (patientId: string) => {
    mutationRemoveProvider.mutate(patientId);
  };

  return (
    <>
      <Head>
        <title>Patient Detail | VIP Medwork</title>
      </Head>
      <main className="p-6 max-w-4xl mx-auto">
        <Button
          variant="secondary"
          onClick={() => router.push("/patients")}
          className="flex items-center gap-2"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Patients
        </Button>

        {isLoading && <p className="mt-4">Loading patient...</p>}
        {error && <p className="mt-4 text-red-500">Error loading patient</p>}

        {patient && (
          <div className="mt-6 border p-6 rounded-xl border-gray-800 bg-gray-900/10 justify-between flex flex-col">
            <h1 className="text-2xl font-bold text-left">{patient.fullName}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-sky-400">
                  Contact Information
                </h2>
                <p>
                  <span className="font-semibold text-gray-300">Email:</span>{" "}
                  {patient.email}
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Phone:</span>{" "}
                  {patient.phone}
                </p>
                <p>
                  <span className="font-semibold text-gray-300">
                    Created At:
                  </span>{" "}
                  {new Date(patient.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-indigo-400">
                    Status
                  </h2>
                  <StatusDropdown
                    selected={patient.status}
                    options={statuses || []}
                    onChange={(s) => handleStatusChange(s.id)}
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-purple-400 mt-2">
                    Provider
                  </h2>
                  {patient.provider?.fullName ? (
                    <div className="flex flex-row gap-2 items-center mt-2">
                      <p>{patient.provider.fullName}</p>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveProvider(patient.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="mt-2"
                      variant="secondary"
                      onClick={() => setPatientId(patient.id)}
                    >
                      Assign Provider
                    </Button>
                  )}
                  
                </div>
              </div>
              {history && (
                <div>
                  <h2 className="text-lg font-semibold text-purple-400 mt-2">
                    Status History
                  </h2>
                  <ul className="mt-2">
                    {history.map((item, index) => (
                      <li key={index} className="flex flex-row gap-2 items-center">
                        <p>{item.status.name}</p>
                        <p>{new Date(item.changedAt).toLocaleString()}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        {patientId && (
          <AssignProviderModal
            patientId={patientId}
            isOpen={!!patientId}
            onClose={() => setPatientId(null)}
          />
        )}
      </main>
    </>
  );
}
