export interface IClass {
    id: number
    name: string
    teacher_id: string
    invite_code: string
    created_at: string
}

export interface IClassDetail {
    class: IClass
    teacher: {
        id: string
        name: string
        subject: string
    }
    student_count: number
    assignment_count: number
}

export interface IClassStats {
    submission_rate: number
    due_today_count: number
}

export interface IAssignment {
    id: number
    class_id: number
    title: string
    description: string
    due_date: string
    created_at: string
}

export interface ICreateClassRequest {
    name: string
}
