import { getAllDepartmentClasses } from "@/api/class";
import { getAllDepartmentCourses } from "@/api/course";
import { getAllDepartments } from "@/api/department";
import { Class, Course, Department } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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

interface CourseState {
    currentCourse: Course | null,
    setCurrentCourse: (currCourse: Course) => void,
    courseList: Course[],
    refreshCourseList: (department: string) => void,
}

export const useCourseState = create<CourseState>((set) => ({
    currentCourse: null,
    setCurrentCourse: (currCourse) => set((state) => ({
        ...state, currentCourse: currCourse,
    })),
    courseList: [],
    refreshCourseList: async (department) => {
        const results = await getAllDepartmentCourses(department);
        if (Array.isArray(results) && results.length) {
            set((state) => ({
                ...state, courseList: results
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

export const useDepartmentState = create<DepartmentState>()(
    persist(
        (set) => ({
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
        }),
        {
            name: 'dept-storage',
            getStorage: () => localStorage, // or sessionStorage
        }
    )
)