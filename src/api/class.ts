import { toast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/config"

export interface ClassAdviserInvite {
    invitedLecturer: string, 
    message: string, 
    departmentId: string
}
export async function inviteLecturerToDepartment(classId: string, payload: ClassAdviserInvite) {
    try {
        const {data, status} = await axiosInstance.post('/class/invite/lecturer/' + classId, payload);
        if (status === 200) {
            toast({
                title: "Success",
                description: data.message,
                variant: 'success'
            })
            return data.data;
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

export async function getAllDepartmentClasses(departmentId: string) {
    try {
        const {data, status} = await axiosInstance.get('/class/'+departmentId);
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

/** create class interface for payload containing name, session, departmentId */
export interface CreateClass {
    name: string,
    session: string,
    departmentId: string
}
export async function createClass(payload: CreateClass) {
    try {
        const {data, status} = await axiosInstance.post('/class/new', payload);
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