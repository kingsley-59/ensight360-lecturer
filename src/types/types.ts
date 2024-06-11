


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

export enum ProfileType {
    LECTURER = 'lecturer',
    STUDENT = 'student',
}

export enum EnrollmentStatus {
    PENDING = 'Pending',
    ACTIVE = 'Active',
    DROPPED = 'Dropped',
    WITHDRAWN = 'Withdrawn',
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
    profile: Profile,
}

export interface Profile extends Model {
    __type: ProfileType,
    user: User | string,
    fullname: string,
    bio?: string,
    phoneNumber?: string,
    address?: string,
    dob?: string,
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
    studentCount: number,
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
    _id?: string,
    name: string,
    maxScore: number,
}

export interface Course {
    title: string,
    code: string,
    description?: string,
    units: number,
    hasPractical: boolean,
    level: number,
    semester: string,
    cordinator: Lecturer,
    createdBy: Lecturer,
    department: string,
    assessments: Assessment[]
}

export interface Enrollment extends Model {
    student: Student,
    enrolledBy: Lecturer,
    class: string,
    department: string,
    registrationName: string,
    registrationNumber: string,
    enrollmentDate: string,
    emrollmentStatus: EnrollmentStatus
} 