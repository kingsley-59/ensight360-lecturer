import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "../dashboard/DataTable"
import { buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"
import GradeStudentDialog from "../dialogs/GradeStudentDialog"
import { Enrollment, RegisteredCourse } from "@/types/types"



// const sampleStudent = [
//     { name: "Akahibe Kingsley Uchechukwu", email: "johndoe@gmail.com", regNo: '20181095823', enrollmentStatus: 'Enrolled' },
//     { name: "Akahibe Kingsley Uchechukwu", email: "johndoe@gmail.com", regNo: '20181095823', enrollmentStatus: 'Enrolled' },
//     { name: "Akahibe Kingsley Uchechukwu", email: "johndoe@gmail.com", regNo: '20181095823', enrollmentStatus: 'Enrolled' },
//     { name: "Akahibe Kingsley Uchechukwu", email: "johndoe@gmail.com", regNo: '20181095823', enrollmentStatus: 'Enrolled' },
//     { name: "Akahibe Kingsley Uchechukwu", email: "johndoe@gmail.com", regNo: '20181095823', enrollmentStatus: 'Enrolled' },
// ]

export interface CourseStudentsTableData extends Enrollment, Omit<RegisteredCourse, 'student'> {}

const columns: ColumnDef<CourseStudentsTableData>[] = [
    {
        accessorKey: 'registrationName',
        header: 'Student'
    },
    {
        accessorKey: 'registrationNumber',
        header: 'Reg. Number',
    },
    {
        accessorKey: 'session',
        header: 'Session',
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({row}) => {
            return (
                <GradeStudentDialog {...row.original}>
                    <span className={cn(buttonVariants({ variant: 'outline' }))} >View</span>
                </GradeStudentDialog>
            )
        }
    }
]


export default function CourseStudentsTable({ data }: { data: CourseStudentsTableData[] }) {


    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
