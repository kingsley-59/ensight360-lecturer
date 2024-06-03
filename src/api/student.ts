import { toast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/config";



export interface CreateStudent {
    registrationName: string;
    registrationNumber: string;
    studentEmail: string;
    classId: string;
    requireApproval: boolean;
}
export const createStudent = async (payload: CreateStudent) => {
    try {
        const { data, status } = await axiosInstance.post('/student/new', payload);
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


/** create function to get student by email */
export const getStudentByEmail = async (email: string) => {
    try {
        const { data, status } = await axiosInstance.get(`/student/email/${email}`);
        if (status === 200) {
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