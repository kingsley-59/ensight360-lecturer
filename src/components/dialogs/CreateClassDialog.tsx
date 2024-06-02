import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { CreateClass, createClass } from "@/api/class";
import { useDepartmentState } from "@/stores";
import { toast } from "../ui/use-toast";




export default function CreateClassDialog({ children }: { children: ReactNode }) {
    const { currentDepartment } = useDepartmentState()
    const { register, handleSubmit } = useForm<CreateClass>({
        defaultValues: {
            departmentId: currentDepartment?._id
        }
    });

    const [loading, setLoading] = useState(false)

    const onSubmit = async (data: CreateClass) => {
        if (!data.departmentId) {
            return toast({
                title: "Form Error",
                description: "Please select a department (at the top left corner of your screen)",
                variant: "destructive",
            })
        }
        setLoading(true)
        const res = await createClass(data).finally(() => setLoading(false));
        console.log(res);
    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Class</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="first-name">Class/Set Name</Label>
                        <Input id="first-name" placeholder="e.g. Erudite class" {...register('name')} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="last-name">Admission Year</Label>
                        <Input id="last-name" placeholder="e.g. 2018" {...register('session')} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="department">Department</Label>
                        <Input id="department" placeholder="e.g. Mechanical Engineering" value={currentDepartment?.name} readOnly />
                    </div>
                    <Button type="submit" variant='default' className="w-full" disabled={loading}>
                        Create new class
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
