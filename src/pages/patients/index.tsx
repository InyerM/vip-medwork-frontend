// Core
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

// Hooks
import { usePatients } from "@/hooks/usePatients";
import { useStatuses } from "@/hooks/useStatuses";

// UI
import Button from "@/components/Button";
import AssignProviderModal from "@/components/AssignProviderModal";
import StatusDropdown from "@/components/StatusDropdown";

// Store
import { usePatientModalStore } from "@/store/patient-modal.store";

// Services
import { removeProviderFromPatient, updatePatientStatus } from "@/services/commands/patient.service";

// Lib
import { queryClient } from "@/lib/react-query";

export default function PatientsPage() {
  const { data, isLoading, error } = usePatients();
  const { patientId, setPatientId } = usePatientModalStore();
  const router = useRouter();
  const { data: statuses } = useStatuses();

  const mutation = useMutation({
    mutationFn: updatePatientStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["patients"] }),
  });

  const mutationRemoveProvider = useMutation({
    mutationFn: removeProviderFromPatient,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["patients"] }),
  });

  const handleStatusChange = (patientId: string, statusId: string) => {
    mutation.mutate({ patientId, statusId });
  };

  const handleRemoveProvider = (patientId: string) => {
    mutationRemoveProvider.mutate(patientId);
  };

  return (
    <>
      <Head>
        <title>Patients | VIP Medwork</title>
      </Head>
      <main className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Patients</h1>
          <Button as="link" href="/patients/new">
            Add Patient
          </Button>
        </div>
        {isLoading && <p>Loading patients...</p>}
        {error && <p className="text-red-600">Error fetching patients</p>}

        <ul className="space-y-4">
          {data?.map((patient) => (
            <li
              key={patient.id}
              className="p-4 border rounded-xl hover:bg-gray-900/20 transition-all duration-200 border-gray-800"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Left: Info */}
                <div
                  className="flex-1 space-y-1 cursor-pointer"
                  onClick={() => router.push(`/patients/${patient.id}`)}
                >
                  <p className="font-medium text-lg">{patient.fullName}</p>
                  <p className="text-sm text-gray-500">{patient.email}</p>
                  <p className="text-sm text-gray-500">{patient.phone}</p>
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold text-sky-500">Created:</span>{" "}
                    {new Date(patient.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-purple-500">
                      Provider:
                    </span>{" "}
                    {patient.provider?.fullName || "Not assigned"}
                  </p>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col justify-between gap-2 min-w-[200px]">
                  <div className="text-sm">
                    <span className="font-semibold text-indigo-500 block mb-1">
                      Status:
                    </span>
                    <StatusDropdown
                      selected={patient.status}
                      options={statuses || []}
                      onChange={(status) =>
                        handleStatusChange(patient.id, status.id)
                      }
                    />
                  </div>

                  {!patient.provider && (
                    <Button
                      variant="secondary"
                      onClick={() => setPatientId(patient.id)}
                      className="mt-2"
                    >
                      Assign Provider
                    </Button>
                  )}
                  {
                    patient.provider && (
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveProvider(patient.id)}
                        className="mt-2"
                      >
                        Remove Provider
                      </Button>
                    )
                  }
                </div>
              </div>
            </li>
          ))}
        </ul>
        {patientId && (
          <AssignProviderModal
            patientId={patientId}
            onClose={() => setPatientId(null)}
            isOpen={!!patientId}
          />
        )}
      </main>
    </>
  );
}
