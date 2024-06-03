import ClassesTable from "@/components/data-tables/ClassesTable";
import StudentsTable from "@/components/data-tables/StudentsTable";
import EnrollStudentDialog from "@/components/dialogs/EnrollStudentDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useClassState } from "@/stores";
import { useEffect } from "react";



export default function Students() {
    const { currentClass } = useClassState()

    useEffect(() => console.log(currentClass), [currentClass])

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
                    <CardTitle>{(typeof currentClass == 'string') ? currentClass : currentClass?.name}</CardTitle>
                    <CardDescription>List of students in the selected class</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="">
                        {(currentClass !== null) ? (
                            <StudentsTable />
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
