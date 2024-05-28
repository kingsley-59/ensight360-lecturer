


export enum UserStatus {
    ACTIVE = 'active',
    SUSPENDED = 'suspended',
    DISABLED = 'disabled',
}

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
    SUPERADMIN = 'superadmin',
}

interface Model {
    _id: string,
    createdAt: string,
    updatedAt: string,
    __v?: number
}

export interface User extends Model {
    firstname: string,
    lastname: string,
    email: string,
    emailIsVerified: boolean,
    passwordHash: string,
    googleId?: string,
    status: UserStatus,
    role: UserRole,
}

export interface Profile extends Model {
    user: User | string,
    fullname: string,
    bio: string,
    phoneNumber: string,
    address: string,
    dob: string,
}

export interface Lecturer extends Profile { }

export interface Student extends Profile { }

export interface Department extends Model {
    name: string
    code: string
    faculty: string
    isPublic: boolean
    institution: string
    institutionCode: string
    headOfDepartment: string
    lecturers: string[]
    students: string[]
}

export interface Class extends Model {
    name: string,
    session: string,
    department: string,
    classAdviser: Lecturer,
    hod: Lecturer
}

export interface DepartmentRegistry extends Model {
    department: Department,
    lecturer: Lecturer,
    isClassAdviser: boolean,
    classAssigned: Class,
    isHod: boolean,
}

export interface Assessment {
    course: string,
    name: string,
    maxScore: number,
}

export interface Course {
    title: string,
    code: string,
    units: number,
    hasPractical: boolean,
    cordinator: Lecturer,
    createdBy: Lecturer,
    department: Department,
    assessments: Assessment[]
}