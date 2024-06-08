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
import { Trash } from "lucide-react";




export default function CreateCourseDialog({ children }: { children: ReactNode }) {
    const { user } = useAuthStore()
    const { currentDepartment } = useDepartmentState()
    const { refreshCourseList } = useCourseState()
    const { register, setValue, watch, handleSubmit } = useForm<CreateCourse>({
        defaultValues: {
            hasPractical: false,
            semester: 'Harmattan',
            coordinator: user?.profile._id,
            departmentId: currentDepartment?._id,
            assessments: [
                { name: 'exam', maxScore: 100 }
            ]
        }
    });
    const assessments = watch('assessments')

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
        const totalAssessmentScore = data.assessments.reduce((total, assessment) => +assessment.maxScore + +total, 0)
        console.log({ totalAssessmentScore })
        if (totalAssessmentScore > 100) {
            console.log('total', totalAssessmentScore)
            return toast({
                title: 'Form Error',
                description: 'Total assessment scores can not be more than 100%',
                variant: 'destructive',
            })
        }
        const validAssessmentNames = data.assessments.every(assessment => !!assessment.name)
        if (!validAssessmentNames) {
            return toast({
                title: 'Form Error',
                description: 'Assessment name is required',
                variant: 'destructive',
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
            <DialogContent className="max-h-screen overflow-y-auto no-scrollbar">
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
                    <div className="grid gap-2 grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Semester</Label>
                            <Input placeholder="e.g. Harmattan" {...register('semester')} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Level</Label>
                            <Input type="number" placeholder="e.g. 100 (level)" {...register('level')} required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="">Units</Label>
                            <Input id="" type="number" placeholder="e.g. 3" {...register('units')} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="">Has Practical</Label>
                            <Select value={String(watch('hasPractical'))} onValueChange={value => setValue('hasPractical', value === 'true')} required>
                                <SelectTrigger>
                                    <SelectValue placeholder='Choose yes or no' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">Yes</SelectItem>
                                    <SelectItem value="false">No</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="">Coordinator</Label>
                        <Input id="" placeholder="e.g. Professor John Doe" value={`${user?.firstname} ${user?.lastname} (You)`} required />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between gap-4">
                            <Label>Assessments</Label>
                            <span role="button" className="rounded-md px-3 py-1 text-white bg-slate-950" onClick={() => setValue('assessments', [...assessments, { name: '', maxScore: 0 }])}>
                                Add
                            </span>
                        </div>
                        {assessments.map((_, index) => (
                            <div className="flex gap-2" key={index}>
                                <Input id="" placeholder="e.g. exam" {...register(`assessments.${index}.name`)} />
                                <Input id="" type="number" placeholder="e.g. 100" {...register(`assessments.${index}.maxScore`)} />
                                <span role="button" className="flex items-center rounded-md px-3 py-1 text-white bg-slate-950" onClick={() => setValue('assessments', assessments.filter((_, i) => i !== index))} >
                                    <Trash className="w-4" stroke="white" />
                                </span>
                            </div>
                        ))}
                    </div>
                    <Button type="submit" variant='default' className="w-full" disabled={loading}>
                        Create new course
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
