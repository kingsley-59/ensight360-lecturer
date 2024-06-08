import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "../dashboard/DataTable"
import { Button } from "../ui/button"
import { Enrollment, User } from "@/types/types"




const columns: ColumnDef<Enrollment>[] = [
    {
        accessorKey: 'registrationName',
        header: 'Student'
    },
    {
        accessorFn: row => (row.student.user as User)?.email,
        header: 'Email'
    },
    {
        accessorKey: 'registrationNumber',
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


export default function EnrolledStudentsTable({ data }: { data: Enrollment[] }) {
    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
