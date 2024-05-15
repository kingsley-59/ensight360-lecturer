import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "../dashboard/DataTable"
import { Button } from "../ui/button"



const sampleStudent = [
    {name: "Akahibe Kingsley Uchechukwu", email: "johndoe@gmail.com", regNo: '20181095823', enrollmentStatus: 'Enrolled'},
    {name: "Akahibe Kingsley Uchechukwu", email: "johndoe@gmail.com", regNo: '20181095823', enrollmentStatus: 'Enrolled'},
    {name: "Akahibe Kingsley Uchechukwu", email: "johndoe@gmail.com", regNo: '20181095823', enrollmentStatus: 'Enrolled'},
    {name: "Akahibe Kingsley Uchechukwu", email: "johndoe@gmail.com", regNo: '20181095823', enrollmentStatus: 'Enrolled'},
    {name: "Akahibe Kingsley Uchechukwu", email: "johndoe@gmail.com", regNo: '20181095823', enrollmentStatus: 'Enrolled'},
]

const columns: ColumnDef<typeof sampleStudent[0]>[] = [
    {
        accessorKey: 'name',
        header: 'Student'
    },
    {
        accessorKey: 'email',
        header: 'Email'
    },
    {
        accessorKey: 'regNo',
        header: 'Reg. Number',
    },
    {
        accessorKey: 'enrollmentStatus',
        header: 'Enrollment Status',
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: () => {
            return (
                <Button variant={'outline'}>View</Button>
            )
        }
    }
]


export default function StudentsTable() {
    return (
        <div>
            <DataTable columns={columns} data={sampleStudent} />
        </div>
    )
}
