export interface IStudent {
    id: string
    name: string
    username: string
    student_number: string
    profile_image: string
    joined_at: string
}

export interface IStudentMetrics {
    id: number
    student_id: string
    logical: number
    structure: number
    grammar: number
    creativity: number
    understanding: number
    updated_at: string
}

export interface IStudentScoreHistory {
    id: number
    student_id: string
    assignment_id: number
    score: number
    created_at: string
    assignment: {
        id: number
        title: string
        due_date: string
        class: {
            id: number
            name: string
        }
    }
}
