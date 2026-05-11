export type Student = {
    id: number
    fullName: string
    identityNumber: string
    email: string
}

export type Staff = {
    id: number
    fullName: string
    identityNumber: string
    email: string
    role: number
}

export type ClassType = {
    id: number
    name: string
    color: string
    grade: string
    students: Student[]
}