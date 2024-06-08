import { getStudentsByClassId } from "@/api/student";
import ClassesTable from "@/components/data-tables/ClassesTable";
import EnrolledStudentsTable from "@/components/data-tables/EnrolledStudentsTable";
import EnrollStudentDialog from "@/components/dialogs/EnrollStudentDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useClassState, useDepartmentState } from "@/stores";
import { Enrollment } from "@/types/types";
import { X } from "lucide-react";
import { useEffect, useState } from "react";



export default function Students() {
    const { currentClass, setCurrentClass } = useClassState()
    const { currentDepartment } = useDepartmentState()

    const [enrolledStudents, setEnrolledStudents] = useState<Enrollment[]>([])

    useEffect(() => {
        console.log(currentClass)
        if (currentClass && currentDepartment?._id) {
            getStudentsByClassId(currentClass?._id, currentDepartment?._id)
                .then(res => {
                    if (res) {
                        console.log('result', res)
                        setEnrolledStudents(res)
                    }
                })
                .catch(err => console.log('classlist error', err))
        }
    }, [currentClass, currentDepartment?._id])

    return (
        <div className="container space-y-4">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Students</h2>
                <EnrollStudentDialog>
                    <Button variant={'default'} className="flex gap-2 text-base">Enroll Student</Button>
                </EnrollStudentDialog>
            </div>
            <Card className="col-span-4">
                <CardHeader >
                    <CardTitle >
                        Classes
                    </CardTitle>
                    <CardDescription>See all students in each class</CardDescription>
                </CardHeader>
                <CardContent className="_pl-2">
                    <ClassesTable />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <CardTitle>{(typeof currentClass == 'string') ? currentClass : currentClass?.name}</CardTitle>
                            <CardDescription>List of students in the selected class</CardDescription>
                        </div>
                        {currentClass && (<Button variant={'secondary'} className="flex gap-2 text-sm" onClick={() => setCurrentClass(null)}><X className="w-4 stroke-slate-950" /></Button>)}
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="">
                        {(currentClass !== null) ? (
                            <EnrolledStudentsTable data={enrolledStudents} />
                        ) : (
                            <div className="w-full h-24 text-center">
                                Select a class to see student details
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
