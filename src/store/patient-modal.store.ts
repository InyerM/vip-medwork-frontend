import { create } from 'zustand';

interface PatientModalState {
  patientId: string | null;
  setPatientId: (id: string | null) => void;
}

export const usePatientModalStore = create<PatientModalState>((set) => ({
  patientId: null,
  setPatientId: (id) => set({ patientId: id }),
}));