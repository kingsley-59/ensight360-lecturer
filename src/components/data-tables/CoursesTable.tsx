import { ColumnDef, Row } from "@tanstack/react-table"
import { DataTable } from "../dashboard/DataTable"
import { Button } from "../ui/button"
import { Course } from "@/types/types"
import { useCourseState } from "@/stores"



function CourseTableActions({ row }: { row: Row<Course> }) {
    const { setCurrentCourse } = useCourseState()

    return (
        <div className="flex gap-2">
            {/* <Button size="sm" variant="outline">Edit</Button> */}
            <Button size="sm" variant="secondary" onClick={() => setCurrentCourse(row.original)}>View</Button>
        </div>
    )
}

const columns: ColumnDef<Course>[] = [
    {
        accessorKey: 'title',
        header: 'Course'
    },
    {
        accessorKey: 'code',
        header: 'Code'
    },
    {
        accessorKey: 'units',
        header: 'Units',
    },
    {
        accessorKey: 'level',
        header: 'Level',
    },
    {
        accessorKey: 'semester',
        header: 'Semester'
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({row}) => <CourseTableActions row={row} />
    }
]


export default function CoursesTable({ data }: { data: Course[] }) {
    return (
        <div className="container !px-0 mx-auto ">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
