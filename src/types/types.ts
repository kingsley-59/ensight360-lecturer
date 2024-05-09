


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
    createdAt: Date,
    updatedAt: Date,
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

export interface Lecturer extends Profile {}

export interface Student extends Profile {}

export interface Department extends Model {
    name: string,
    short: string,
    faculty: string,
    institution: string,
    headOfDepartment: Lecturer,
    lecturers: Lecturer[]
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