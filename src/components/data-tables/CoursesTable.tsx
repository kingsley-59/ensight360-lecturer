import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "../dashboard/DataTable"


const sampleCourses = [
    { name: "Manufacturing Processes", code: 'MEE407', unit: 3, semester: 'Harmattan', level: 400 },
    { name: "Manufacturing Processes", code: 'MEE407', unit: 3, semester: 'Harmattan', level: 400 },
    { name: "Manufacturing Processes", code: 'MEE407', unit: 3, semester: 'Harmattan', level: 400 },
    { name: "Manufacturing Processes", code: 'MEE407', unit: 3, semester: 'Harmattan', level: 400 },
    { name: "Manufacturing Processes", code: 'MEE407', unit: 3, semester: 'Harmattan', level: 400 },
]

const columns: ColumnDef<typeof sampleCourses[0]>[] = [
    {
        accessorKey: 'name',
        header: 'Course'
    },
    {
        accessorKey: 'code',
        header: 'Code'
    },
    {
        accessorKey: 'unit',
        header: 'Units',
    },
    {
        accessorKey: 'level',
        header: 'Level',
    },
    {
        accessorKey: 'semester',
        header: 'Semester'
    }
]


export default function CoursesTable() {
    return (
        <div className="container !px-0 mx-auto ">
            <DataTable columns={columns} data={sampleCourses} />
        </div>
    )
}
