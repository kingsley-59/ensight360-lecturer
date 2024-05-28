import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { ICreateDepartmentOptions, createDepartment } from "@/api/department";
import { useDepartmentState } from "@/stores";


export default function CreateDepartmentDialog({ children }: { children: ReactNode }) {
    const { register, setValue, handleSubmit } = useForm<ICreateDepartmentOptions>()
    const { refreshList } = useDepartmentState()
    const [loading, setLoading] = useState(false)

    async function formHandler(formData: ICreateDepartmentOptions) {
        setLoading(true)
        const result = await createDepartment({ ...formData }).finally(() => setLoading(false))

        if (result) {
            console.log('new dept result', result)
            refreshList()
        }
    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle className="text-xl">Create Department</DialogTitle>
                    <DialogDescription></DialogDescription>
                    <form onSubmit={handleSubmit(formHandler)} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label>Name</Label>
                            <Input type="text" placeholder="e.g. Mechanical Engineering" {...register("name")} required />
                        </div>
                        <div className="grid gap-2">
                            <Label>Code</Label>
                            <Input type="text" placeholder="e.g. MEE" {...register("code")} required />
                        </div>
                        <div className="grid gap-2">
                            <Label>Faculty</Label>
                            <Input type="text" placeholder="e.g. Faculty of Engineering" {...register("faculty")} required />
                        </div>
                        <div className="grid gap-2">
                            <Label>Institution</Label>
                            <Input type="text" placeholder="e.g. Federal University of Technology, Owerri" {...register("institution")} required />
                        </div>
                        <div className="grid gap-2">
                            <Label>Institution Code</Label>
                            <Input type="text" placeholder="e.g. FUTO" {...register("institutionCode")} required />
                        </div>
                        <div className="flex gap-2">
                            <Checkbox id="makePublic" onCheckedChange={(checked) => setValue('isPublic', checked as boolean)} />
                            <Label htmlFor="makePublic">Make department public</Label>
                        </div>
                        <Button type="submit" variant='default' className="w-full" disabled={loading}>
                            Create department
                        </Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
