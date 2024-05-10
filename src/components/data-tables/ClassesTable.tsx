
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../dashboard/DataTable';
import { Button } from '../ui/button';


const sampleClass = [
    { name: '2018/2019 set', year: '2018', studentCount: 167, adviser: 'Engr. Boniface' },
    { name: '2018/2019 set', year: '2018', studentCount: 167, adviser: 'Engr. Boniface' },
    { name: '2018/2019 set', year: '2018', studentCount: 167, adviser: 'Engr. Boniface' },
    { name: '2018/2019 set', year: '2018', studentCount: 167, adviser: 'Engr. Boniface' },
    { name: '2018/2019 set', year: '2018', studentCount: 167, adviser: 'Engr. Boniface' }
]

const columns: ColumnDef<typeof sampleClass[0]>[] = [
    {
        accessorKey: "name"
    },
    {
        accessorKey: "year",
        header: "Year"
    },
    {
        accessorKey: 'studentCount',
        header: 'Students',
    },
    {
        accessorKey: 'adviser',
        header: "Class Adviser"
    },
    {
        id: 'Actions',
        header: "Actions",
        cell: () => {
            return (
                <Button size="sm" variant="outline">
                    Edit
                </Button>
            )
        }
    }
]


export default function ClassesTable() {


    return (
        <div className="container !px-0 mx-auto ">
            <DataTable columns={columns} data={sampleClass} />
        </div>
    )
}