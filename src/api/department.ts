import { toast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/config"



export async function getAllDepartments() {
    try {
        const { data, status } = await axiosInstance.get('/department');
        if (status === 200) {
            // toast({
            //     title: "Success",
            //     description: data.message,
            //     variant: 'success'
            // })
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

export interface ICreateDepartmentOptions {
    name: string, 
    code: string, 
    faculty: string, 
    institution: string, 
    institutionCode: string, 
    isPublic: boolean,
}
export async function createDepartment(options: ICreateDepartmentOptions) {
    try {
        const { data, status } = await axiosInstance.post('/department/new', { ...options });
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

interface ILecturerInviteOptions {
    departmentId: string, 
    invitedLecturer: string, 
    message: string,
}
export async function inviteLecturerToDepartment(options: ILecturerInviteOptions) {
    try {
        const { data, status } = await axiosInstance.post('/department/invite/lecturer', { ...options });
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