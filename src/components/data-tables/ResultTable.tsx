import { RegisteredCourse } from "@/types/types";
import { DataTable } from "../dashboard/DataTable";
import { ColumnDef } from "@tanstack/react-table";


interface ResultTableData extends RegisteredCourse { }

const columns: ColumnDef<ResultTableData>[] = [
    {
        accessorFn: row => row.course.title,
        header: 'Title'
    },
    {
        accessorFn: row => row.course.code,
        header: 'Code'
    },
    {
        accessorFn: row => row.course.units,
        header: 'Units'
    },
    {
        accessorFn: row => row.course.level,
        header: 'Level'
    },
    {
        accessorFn: row => row.course.semester,
        header: 'Semester'
    },
    {
        accessorFn: row => row.scores,
        header: 'Scores',
        cell: ({ row }) => {
            return (
                <div className="grid gap-1">
                    {row.original.scores.map(score => (
                        <div className="flex justify-between gap-2">
                            <span className="font-semibold">{score.name}</span>
                            <span>{score.achievedScore}</span>
                        </div>
                    ))}
                </div>
            )
        }
    },
    {
        accessorKey: 'totalScore',
        header: 'Total score'
    }
]
export default function ResultTable({ data }: { data: ResultTableData[] }) {
    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
