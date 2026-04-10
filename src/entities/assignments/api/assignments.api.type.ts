export interface IAssignment {
    id: number
    class_id: number
    title: string
    description: string
    due_date: string
    created_at: string
    class?: {
        id: number
        name: string
    }
}

export interface IAssignmentDetail extends IAssignment {
    stats: {
        total_students: number
        submitted_count: number
        graded_count: number
        submission_rate: number
    }
    my_submission?: any
}

export interface ICreateAssignmentRequest {
    class_id: number
    title: string
    description: string
    due_date: string
}

export interface IUpdateAssignmentRequest {
    title?: string
    description?: string
    due_date?: string
}
