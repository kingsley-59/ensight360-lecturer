import { toast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/config";
import { Assessment } from "@/types/types";


/** create course interface having properties title, code, units, hasPractical, coordinator, departmentId */
export interface CreateCourse {
    title: string
    code: string
    units: number
    hasPractical: boolean
    coordinator: string
    semester: string
    level: number
    departmentId: string
    assessments: Omit<Assessment, 'course'>[]
}
export async function createCourse(payload: CreateCourse) {
    try {
        const {data, status} = await axiosInstance.post('/course/new', payload);
        if (status == 200) {
            toast({
                title: "Success",
                description: data.message,
                variant: 'success'
            })
            return data.data
        } else {
            toast({
                title: "Request failed",
                description: data.message,
                variant: 'warning'
            })
        }
    } catch (error: unknown) {
        toast({
            title: "Request failed",
            description: "Application error! Please contact admin",
            variant: 'destructive'
        })
    }
}

export async function getAllDepartmentCourses(departmentId: string) {
    try {
        const {data, status} = await axiosInstance.get('/course/'+departmentId);
        if (status == 200) {
            return data.data
        } else {
            toast({
                title: "Request failed",
                description: data.message,
                variant: 'warning'
            })
        }
    } catch (error: unknown) {
        toast({
            title: "Request failed",
            description: "Application error! Please contact admin",
            variant: 'destructive'
        })
    }
}

export async function getCourseUniqueSessions(courseId: string) {
    try {
        const {data, status} = await axiosInstance.get('/course/sessions/'+courseId);
        if (status == 200) {
            return data.data
        } else {
            toast({
                title: "Request failed",
                description: data.message,
                variant: 'warning'
            })
        }
    } catch (error: unknown) {
        toast({
            title: "Request failed",
            description: "Application error! Please contact admin",
            variant: 'destructive'
        })
    }
}