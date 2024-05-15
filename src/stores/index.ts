import { Class } from "@/types/types";
import { create } from "zustand";

interface ClassState {
    currentClass: string | Class | null,
    setCurrentClass: (currClass: Class | string) => void
}

export const useClassState = create<ClassState>((set) => ({
    currentClass: null,
    setCurrentClass: (currClass) => set((state) => ({
        ...state, currentClass: currClass,
    }))
}))
