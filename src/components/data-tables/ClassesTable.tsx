
import { ColumnDef, Row } from '@tanstack/react-table';
import { DataTable } from '../dashboard/DataTable';
import { Button } from '../ui/button';
import { useClassState } from '@/stores';


const sampleClass = [
    { name: '2018/2019 set', year: '2018', studentCount: 167, adviser: 'Engr. Boniface' },
    { name: '2018/2019 set', year: '2018', studentCount: 167, adviser: 'Engr. Boniface' },
    { name: '2018/2019 set', year: '2018', studentCount: 167, adviser: 'Engr. Boniface' },
    { name: '2018/2019 set', year: '2018', studentCount: 167, adviser: 'Engr. Boniface' },
    { name: '2018/2019 set', year: '2018', studentCount: 167, adviser: 'Engr. Boniface' }
]

function ClassTableActions({ row }: { row: Row<typeof sampleClass[0]> }) {
    const { setCurrentClass } = useClassState()

    return (
        <div className="flex gap-2" onClick={() => console.log('Clicked')}>
            <Button size="sm" variant="outline">Edit</Button>
            <Button size="sm" variant="default" onClick={() =>{ {console.log(row.original.name); setCurrentClass(row.original.name)}}}>View</Button>
        </div>
    )
}

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
        cell: ({ row }) => <ClassTableActions row={row} />
    }
]


export default function ClassesTable() {


    return (
        <div className="container !px-0 mx-auto ">
            <DataTable columns={columns} data={sampleClass} />
        </div>
    )
}