import { Link } from "react-router-dom";
import { ReactNode } from "react";
import useDashboardNavs from "../hooks/useDashboardNavs";


import React, { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import useTabStore from "../stores/reportTabsStore";

interface Employee {
    id: number;
    name: string;
    avatarUrl: string;
    // Add other employee data fields as needed
}

interface EmployeeSelectProps {
    employees: Employee[];
}

const EmployeeSelect: React.FC<EmployeeSelectProps> = ({ employees }) => {
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(employees[0]);

    const handleEmployeeChange = (event: SelectChangeEvent<number>) => {
        const employeeId = event.target.value as number;
        const employee = employees.find((emp) => emp.id === employeeId);
        setSelectedEmployee(employee || null);
    };

    return (
        <div>
            <Select
                size="small"
                className="min-w-[260px]"
                value={selectedEmployee ? selectedEmployee.id : ''}
                onChange={handleEmployeeChange}
                displayEmpty
                sx={{ padding: '0px 0 0 0' }}
            >
                {employees.map((employee) => (
                    <MenuItem key={employee.id} value={employee.id}>
                        <div className="w-full start gap-2 text-[13px] text-secondary-500">
                            <Avatar alt={employee.name} src={employee.avatarUrl} style={{
                                width: "24px",
                                height: "24px",
                            }} className="w-6 h-6" />
                            {employee.name}
                        </div>
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};

const employees = [
    {
        id: 1,
        name: 'John Doe',
        avatarUrl: '/images/male-avatar-1.png',
    },
    {
        id: 2,
        name: 'Jane Smith',
        avatarUrl: '/images/male-avatar-1.png',
    },
    {
        id: 3,
        name: 'John Doe',
        avatarUrl: '/images/male-avatar-1.png',
    },
    {
        id: 4,
        name: 'Jane Smith',
        avatarUrl: '/images/male-avatar-1.png',
    },
    {
        id: 5,
        name: 'John Doe',
        avatarUrl: '/images/male-avatar-1.png',
    },
    {
        id: 6,
        name: 'Jane Smith',
        avatarUrl: '/images/male-avatar-1.png',
    },
];

export default function DashboardWrapper({ children }: { children: ReactNode }) {
    const { pageTitle } = useDashboardNavs();
    const { currentTab } = useTabStore().reportTabs;

    return (
        <div className="bg-[#f1f1f1] w-full min-h-full overflow-x-hidden pl-8 pr-10 pt-7 pb-8 relative">
            <div className="w-full between mb-10">
                <div className="text-2xl font-semibold">{pageTitle}</div>
                {currentTab == 1 ? (
                    <EmployeeSelect employees={employees} />
                ) : (
                    <Link to={'/'}>Help & Feedback</Link>
                )}
            </div>
            <div className="w-full">
                {children}
            </div>
        </div>
    )
}
