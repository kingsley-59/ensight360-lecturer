import CoursesTable from "@/components/data-tables/CoursesTable";
import StudentsTable from "@/components/data-tables/StudentsTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileIcon } from "lucide-react";
import { useState } from "react";


function CourseSummaryTab() {

    return (
        <div className="p-6 space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Introduction to Computer Science</h2>
                <p className="text-gray-500 dark:text-gray-400">CS101</p>
            </div>
            <div>
                <h3 className="text-lg font-medium">Course Syllabus</h3>
                <p className="text-gray-500 dark:text-gray-400">
                    This course provides an introduction to the fundamental concepts of computer science, including
                    algorithms, data structures, and programming languages.
                </p>
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
            <div>
                <h3 className="text-lg font-medium">Assessments</h3>
                <ul className="space-y-2">
                    <li>
                        <div className="flex items-center justify-between">
                            <span>Midterm Exam</span>
                            <span className="text-gray-500 dark:text-gray-400">30%</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center justify-between">
                            <span>Final Exam</span>
                            <span className="text-gray-500 dark:text-gray-400">40%</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center justify-between">
                            <span>Programming Assignments</span>
                            <span className="text-gray-500 dark:text-gray-400">30%</span>
                        </div>
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
    const [selectedCourse, ] = useState('jjj')

    return (
        <div className="container space-y-4">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
                <div className="flex items-center space-x-2">
                    <Button variant={'default'} className="flex gap-2 text-base">Create Course</Button>
                </div>
            </div>
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
                            {(selectedCourse) ? (
                                <CourseSummaryTab />
                            ) : (
                                <div className="w-full h-24 text-center">
                                    Select a course to see details
                                </div>
                            )}
                        </TabsContent>
                        <TabsContent value="students" className="space-y-4" >
                            {(selectedCourse) ? (
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
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        List of all courses
                    </CardTitle>
                    <CardDescription>Select one to view details above</CardDescription>
                </CardHeader>
                <CardContent className="">
                    <CoursesTable />
                </CardContent>
            </Card>
        </div>
    )
}
