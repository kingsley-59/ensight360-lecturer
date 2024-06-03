import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useCourseState, useDepartmentState } from "@/stores";
import { toast } from "../ui/use-toast";
import { CreateCourse, createCourse } from "@/api/course";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import useAuthStore from "@/stores/authStore";




export default function CreateCourseDialog({ children }: { children: ReactNode }) {
    const { user } = useAuthStore()
    const { currentDepartment } = useDepartmentState()
    const { refreshCourseList } = useCourseState()
    const { register, handleSubmit } = useForm<CreateCourse>({
        defaultValues: {
            coordinator: user?._id,
            departmentId: currentDepartment?._id
        }
    });

    const [loading, setLoading] = useState(false)

    const onSubmit = async (data: CreateCourse) => {
        if (!data.departmentId) {
            return toast({
                title: "Form Error",
                description: "Please select a department (at the top left corner of your screen)",
                variant: "destructive",
            })
        }
        if (!data.coordinator) {
            return toast({
                title: "Form Error",
                description: "User details are unavailble. Please login again.",
                variant: "destructive",
            })
        }
        setLoading(true)
        const result = await createCourse(data).finally(() => setLoading(false));
        if (result) {
            console.log('new class', result)
            refreshCourseList(data.departmentId)
        }
    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Course</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="">Title</Label>
                        <Input id="" placeholder="e.g. Engineering Mechanics" {...register('title')} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="">Course Code</Label>
                        <Input id="" placeholder="e.g. MEE 101" {...register('code')} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="">Units</Label>
                        <Input id="" type="number" placeholder="e.g. 3" {...register('units')} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="">Has Practical</Label>
                        <Select {...register('hasPractical')} required>
                            <SelectTrigger>
                                <SelectValue placeholder='Choose yes or no' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Yes</SelectItem>
                                <SelectItem value="0">No</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="">Coordinator</Label>
                        <Input id="" placeholder="e.g. Professor John Doe" value={`${user?.firstname} ${user?.lastname}`} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="">Department</Label>
                        <Input id="" placeholder="e.g. Mechanical Engineering" value={currentDepartment?.name} readOnly />
                    </div>
                    <Button type="submit" variant='default' className="w-full" disabled={loading}>
                        Create new class
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
