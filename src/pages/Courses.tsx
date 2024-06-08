import CoursesTable from "@/components/data-tables/CoursesTable";
import StudentsTable from "@/components/data-tables/StudentsTable";
import CreateCourseDialog from "@/components/dialogs/CreateCourseDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCourseState, useDepartmentState } from "@/stores";
import { Course } from "@/types/types";
import { FileIcon } from "lucide-react";
import { useEffect } from "react";


function CourseSummaryTab({ course }: { course: Course }) {

    return (
        <div className="p-6 space-y-6">
            <div>
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <p className="text-gray-500 dark:text-gray-400">{course.code}</p>
            </div>
            <div>
                <h3 className="text-lg font-medium">Course Description</h3>
                <p className="text-gray-500 dark:text-gray-400">
                    {course?.description}
                </p>
            </div>
            <div>
                <h3 className="text-lg font-medium">Assessments</h3>
                <ul className="space-y-2">
                    {course.assessments.map((assessment) => (
                        <li key={assessment?._id}>
                            <div className="flex items-center justify-between">
                                <span>{assessment.name}</span>
                                <span className="text-gray-500 dark:text-gray-400">{assessment.maxScore}%</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-medium">Course Materials</h3>
                <ul className="space-y-2">
                    <li>
                        <a
                            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="#"
                        >
                            <FileIcon className="h-4 w-4" />
                            Lecture Slides
                        </a>
                    </li>
                    <li>
                        <a
                            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="#"
                        >
                            <FileIcon className="h-4 w-4" />
                            Programming Assignments
                        </a>
                    </li>
                    <li>
                        <a
                            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="#"
                        >
                            <FileIcon className="h-4 w-4" />
                            Recommended Textbook
                        </a>
                    </li>
                </ul>
            </div>
            
        </div>
    )
}

function StudentManagementTab() {

    return (
        <div className="w-full space-y-4">
            <div className="space-y-2">
                <CardTitle>Student Management</CardTitle>
                <CardDescription>Manage the students enrolled in this course</CardDescription>
            </div>
            <StudentsTable />
        </div>
    )
}

export default function Courses() {
    const { currentDepartment } = useDepartmentState()
    const { courseList, refreshCourseList, currentCourse } = useCourseState()

    useEffect(() => {
        if (currentDepartment?._id) refreshCourseList(currentDepartment?._id)
    }, [currentDepartment?._id, refreshCourseList])

    return (
        <div className="container space-y-4">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
                <CreateCourseDialog>
                    <Button variant={'default'} className="flex gap-2 text-base">Create Course</Button>
                </CreateCourseDialog>
            </div>
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        List of all courses
                    </CardTitle>
                    <CardDescription>Select one to view details above</CardDescription>
                </CardHeader>
                <CardContent className="">
                    <CoursesTable data={courseList} />
                </CardContent>
            </Card>
            <Card className="col-span-4">
                <CardContent className="pt-4">
                    <Tabs defaultValue="details" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="details">Course Details</TabsTrigger>
                            <TabsTrigger value="students" >Student Management</TabsTrigger>
                            {/* <TabsTrigger value="grading" >
                                Grading
                            </TabsTrigger>
                            <TabsTrigger value="notifications" disabled>
                                Notifications
                            </TabsTrigger> */}
                        </TabsList>
                        <TabsContent value="details" className="space-y-4">
                            {(currentCourse) ? (
                                <CourseSummaryTab course={currentCourse} />
                            ) : (
                                <div className="w-full h-24 text-center">
                                    Select a course to see details
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent value="students" className="space-y-4" >
                            {(currentCourse) ? (
                                <StudentManagementTab />
                            ) : (
                                <div className="w-full h-24 text-center">
                                    Select a course to see details
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

        </div>
    )
}
