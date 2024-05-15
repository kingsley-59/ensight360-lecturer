import { toast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/config"


interface RegisterUserOptions {
    email: string, firstname: string, lastname: string, password: string
}

export async function registerUser(options: RegisterUserOptions) {
    const { email, firstname, lastname, password } = options;
    try {
        const { data, status } = await axiosInstance.post('/user/register', { email, firstname, lastname, password });
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
            title: "Signup Error",
            description: "Application error! Please contact admin",
            variant: 'destructive'
        })
    }
}

interface LoginOptions { email: string, password: string, profile: string }
export async function loginUser(options: LoginOptions) {
    try {
        const { data, status } = await axiosInstance.post('/user/login', { ...options });
        if (status === 200) {
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
            title: "Signup Error",
            description: "Application error! Please contact admin",
            variant: 'destructive'
        })
    }
}