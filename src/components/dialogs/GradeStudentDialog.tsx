import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RegisteredCourse } from "@/types/types";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { CourseStudentsTableData } from "../data-tables/CourseStudentsTable";
import { toast } from "../ui/use-toast";
import { updateStudentCourseScores } from "@/api/course";

interface GradeStudentProps extends CourseStudentsTableData {
    children: ReactNode,
}
interface GradeStudentForm extends Omit<RegisteredCourse, 'student' | 'course'> { }

export default function GradeStudentDialog(props: GradeStudentProps) {
    const { children, registrationName, registrationNumber, scores: defaultScores, session, course } = props;
    const { register, setValue, watch, handleSubmit } = useForm<GradeStudentForm>({
        defaultValues: {
            scores: defaultScores || [],
        }
    })

    const scores = watch('scores', defaultScores)

    const [loading, setLoading] = useState(false)

    const onSubmit = async (formData: GradeStudentForm) => {
        setLoading(true)
        console.log('formData', formData)
        let scoreError = ''
        const validScores = formData.scores.every(score => {
            if (score.achievedScore > score.maxScore) {
                scoreError = 'Invalid scores'
            }
            return score.achievedScore <= score.maxScore
        })
        if (!validScores || scoreError) {
            return toast({
                title: 'Score Error',
                description: scoreError,
                variant: 'destructive',
            })
        }

        updateStudentCourseScores(course._id, session, formData.scores)
            .finally(() => setLoading(false))
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
                        <Label htmlFor="first-name">Student Name</Label>
                        <Input id="first-name" placeholder="e.g. John Kennedy" value={registrationName} readOnly required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="last-name">Student Reg. No.</Label>
                        <Input id="last-name" placeholder="e.g. 2018..." value={registrationNumber} readOnly required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="last-name">Session</Label>
                        <Input id="last-name" placeholder="e.g. 2022-2023" value={session} readOnly required />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between gap-4">
                            <Label>Assessments</Label>
                        </div>
                        {scores.map((score, index) => (
                            <div className="grid gap-1" key={index}>
                                <Label className="text-sm">{score.name} <span className="opacity-70">(max. {score.maxScore})</span></Label>
                                <div className="flex gap-2">
                                    <Input id=""
                                        type="number"
                                        max={score.maxScore}
                                        {...register(`scores.${index}.achievedScore`, {
                                            validate: (value) => value <= score.maxScore || `Score must be less than or equal to ${score.maxScore}`
                                        })}
                                    />
                                    <span role="button" className="flex items-center rounded-md px-3 py-1 text-white bg-slate-950" onClick={() => setValue(`scores.${index}.achievedScore`, 0)} >
                                        <X className="w-4" stroke="white" />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button type="submit" variant='default' className="w-full" disabled={loading}>
                        Update scores
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
