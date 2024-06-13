import { getStudentResults, getStudentsByClassId } from "@/api/student";
import ResultTable from "@/components/data-tables/ResultTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useClassState, useDepartmentState } from "@/stores";
import { Class, Enrollment, RegisteredCourse } from "@/types/types";
import { ArrowDownFromLineIcon } from "lucide-react";
import { useEffect, useState } from "react";



export default function Results() {
    const { classList, refreshClassList } = useClassState()
    const { currentDepartment } = useDepartmentState()

    const [selectedClass, setSelectedClass] = useState<Class | null>(null)
    const [selectedStudent, setSelectedStudent] = useState<Enrollment | null>(null)
    const [enrolledStudents, setEnrolledStudents] = useState<Enrollment[]>([])
    const [studentResults, setStudentResults] = useState<{ session: string, courses: RegisteredCourse[] }[]>([])

    useEffect(() => {
        if (!classList.length && currentDepartment?._id) {
            refreshClassList(currentDepartment._id)
        }
    }, [classList.length, currentDepartment?._id, refreshClassList])

    useEffect(() => {
        if (selectedClass && currentDepartment?._id) {
            getStudentsByClassId(selectedClass?._id, currentDepartment?._id)
                .then(res => {
                    if (res) {
                        console.log('result', res)
                        setEnrolledStudents(res)
                    }
                })
                .catch(err => console.log('classlist error', err))
        }
    }, [selectedClass, currentDepartment?._id])

    useEffect(() => {
        if (selectedStudent) {
            getStudentResults(selectedStudent._id)
                .then(res => {
                    console.log(res)
                    if (Array.isArray(res) && res[0].session && Array.isArray(res[0].courses)) {
                        setStudentResults(res)
                    }
                })
        }
    }, [selectedStudent])

    const onClassChange = (value: string) => {
        setSelectedClass(classList.find(c => c._id === value) || null)
        setSelectedStudent(null)
    }

    const onStudentChange = (value: string) => {
        setSelectedStudent(enrolledStudents.find(c => c._id === value) || null)
    }

    return (
        <div className="container space-y-4">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Results</h2>
            </div>

            <Card className="min-h-[200px]">
                <CardHeader>
                    <CardDescription>
                        Select class and choose from the list of enrolled students
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full grid grid-cols-2 gap-3">
                        <div className="grid gap-2">
                            <Label>Class</Label>
                            <Select value={selectedClass?._id} onValueChange={onClassChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a class" />
                                </SelectTrigger>
                                <SelectContent>
                                    {classList.map((c) => (
                                        <SelectItem key={c._id} value={c._id}>
                                            {c.name} - {c.session}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Student</Label>
                            <Select value={selectedStudent?._id} onValueChange={onStudentChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a class" />
                                </SelectTrigger>
                                <SelectContent>
                                    {enrolledStudents.map((s) => (
                                        <SelectItem key={s._id} value={s._id}>
                                            {s.registrationName} - {s.registrationNumber}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Results</CardTitle>
                    <CardDescription>View results of selected student for each academic session</CardDescription>
                </CardHeader>
                <CardContent>
                    {studentResults.map((result, idx) => (
                        <div className="space-y-3 py-10 border-b" key={idx}>
                            <div className="flex gap-5 justify-between items-start">
                                <h1 className="font-bold text-2xl text-slate-950">{result.session}</h1>
                                <Button variant={'default'} className="gap-2">Export <ArrowDownFromLineIcon size={16} /> </Button>
                            </div>
                            <div className="w-full ">
                                <ResultTable data={result.courses} />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
