import { ReactNode, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useClassState, useDepartmentState } from "@/stores";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CreateStudent, createStudent } from "@/api/student";
import useAuthStore from "@/stores/authStore";
import { Class } from "@/types/types";




export default function EnrollStudentDialog({ children }: { children: ReactNode }) {
    const { user } = useAuthStore()
    const { classList } = useClassState()
    const { currentDepartment } = useDepartmentState()
    const { register, watch, setValue, handleSubmit } = useForm<CreateStudent>({
        defaultValues: {
            requireApproval: false
        }
    });

    const [loading, setLoading] = useState(false)
    const [assignedClasses, setAssignedClasses] = useState<Class[]>([])

    useEffect(() => {
        const myClasses = classList.filter(c => c.classAdviser._id === user?.profile?._id || c.hod._id === user?.profile?._id)
        if (myClasses.length) {
            setAssignedClasses(myClasses)
        }
    }, [classList, user])

    const onSubmit = async (data: CreateStudent) => {
        setLoading(true)
        const result = await createStudent(data).finally(() => setLoading(false));
        if (result) {
            console.log('new student', result)
        }
    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enroll New Student</DialogTitle>
                    <DialogDescription className=""></DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="registrationName">Registration Name</Label>
                        <Input id="registrationName" placeholder="Registration Name" {...register('registrationName')} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="registrationNumber">Registration Number</Label>
                        <Input id="registrationNumber" placeholder="Registration Number" {...register('registrationNumber')} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="studentEmail">Student Email</Label>
                        <Input id="studentEmail" placeholder="Student Email" type="email" {...register('studentEmail')} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="">Class</Label>
                        <Select value={watch('classId', '')} onValueChange={(value) => setValue('classId', value)} {...register('classId')} required>
                            <SelectTrigger>
                                <SelectValue placeholder='Select class' />
                            </SelectTrigger>
                            <SelectContent>
                                {assignedClasses.map((item) => (
                                    <SelectItem key={item._id} value={item._id}>{item.name}({item.session})</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="">Department</Label>
                        <Input type="text" placeholder="e.g. Mechanical Engineering" value={currentDepartment?.name} readOnly />
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="requireApproval" checked={watch('requireApproval')} onChange={(e) => setValue('requireApproval', e.target.checked)} className="w-4 h-4 checked:accent-slate-900" />
                        <Label htmlFor="requireApproval">Require Approval</Label>
                    </div>
                    <Button type="submit" variant='default' className="w-full" disabled={loading}>
                        Enroll student
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
