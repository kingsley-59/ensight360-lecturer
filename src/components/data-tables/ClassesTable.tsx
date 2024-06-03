
import { ColumnDef, Row } from '@tanstack/react-table';
import { DataTable } from '../dashboard/DataTable';
import { Button } from '../ui/button';
import { useClassState, useDepartmentState } from '@/stores';
import { Class } from '@/types/types';
import { useEffect } from 'react';


// const sampleClass = [
//     { name: '2018/2019 set', year: '2018', studentCount: 167, adviser: 'Engr. Boniface' },
//     { name: '2018/2019 set', year: '2018', studentCount: 167, adviser: 'Engr. Boniface' },
//     { name: '2018/2019 set', year: '2018', studentCount: 167, adviser: 'Engr. Boniface' },
//     { name: '2018/2019 set', year: '2018', studentCount: 167, adviser: 'Engr. Boniface' },
//     { name: '2018/2019 set', year: '2018', studentCount: 167, adviser: 'Engr. Boniface' }
// ]

function ClassTableActions({ row }: { row: Row<Class> }) {
    const { setCurrentClass } = useClassState()

    return (
        <div className="flex gap-2" onClick={() => console.log('Clicked')}>
            <Button size="sm" variant="outline">Edit</Button>
            <Button size="sm" variant="default" onClick={() => setCurrentClass(row.original)}>View</Button>
        </div>
    )
}

const columns: ColumnDef<Class>[] = [
    {
        accessorKey: "name"
    },
    {
        accessorKey: "session",
        header: "Year"
    },
    {
        accessorKey: 'studentCount',
        header: 'Students',
    },
    {
        accessorFn: (row) => row.classAdviser.fullname,
        header: "Class Adviser"
    },
    {
        id: 'Actions',
        header: "Actions",
        cell: ({ row }) => <ClassTableActions row={row} />
    }
]


export default function ClassesTable() {
    const { currentDepartment } = useDepartmentState()
    const { classList, refreshClassList } = useClassState()

    useEffect(() => {
        if (!classList.length && currentDepartment?._id) {
            refreshClassList(currentDepartment._id)
        }
    }, [classList.length, currentDepartment?._id, refreshClassList])

    return (
        <div className="container !px-0 mx-auto ">
            <DataTable columns={columns} data={classList} />
        </div>
    )
}