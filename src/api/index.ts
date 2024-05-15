/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "@/components/ui/use-toast";


type ApiCall<T extends any[]> = (...args: T) => Promise<any>;

export async function withErrorHandling<T extends any[]>(apiCall: ApiCall<T>, ...args: T) {
    try {
        const { data, status } = await apiCall(...args);
        if (status === 200) {
            toast({
                title: "Success",
                description: data.message,
                variant: 'success'
            });
        } else {
            toast({
                title: "Request failed",
                description: data.message,
                variant: 'warning'
            });
        }
        return { data, status };
    } catch (error: unknown) {
        toast({
            title: "Application Error",
            description: "Please contact admin",
            variant: 'destructive'
        });
        throw error;
    }
}
