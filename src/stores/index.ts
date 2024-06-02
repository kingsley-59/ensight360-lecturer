import { getAllDepartmentClasses } from "@/api/class";
import { getAllDepartments } from "@/api/department";
import { Class, Department } from "@/types/types";
import { create } from "zustand";

interface ClassState {
    currentClass: string | Class | null,
    setCurrentClass: (currClass: Class | string) => void,
    classList: Class[],
    refreshClassList: (department: string) => void,
}

export const useClassState = create<ClassState>((set) => ({
    currentClass: null,
    setCurrentClass: (currClass) => set((state) => ({
        ...state, currentClass: currClass,
    })),
    classList: [],
    refreshClassList: async (department) => {
        const results = await getAllDepartmentClasses(department);
        if (Array.isArray(results) && results.length) {
            set((state) => ({
                ...state, classList: results
            }))
        }
    }
}))

interface DepartmentState {
    currentDepartment: Department | null,
    setCurrentDepartment: (dept: Department) => void
    departmentList: Department[],
    refreshList: () => void,
}

export const useDepartmentState = create<DepartmentState>((set) => ({
    currentDepartment: null,
    departmentList: [],
    setCurrentDepartment: (dept) => set((state) => ({
        ...state, currentDepartment: dept,
    })),
    refreshList: async () => {
        const results = await getAllDepartments();
        if (Array.isArray(results) && results.length) {
            set((state) => ({
                ...state, departmentList: results
            }))
        }
    }
}))