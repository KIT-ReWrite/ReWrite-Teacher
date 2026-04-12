export interface ISubmissionRateByClass {
    class_id: number
    class_name: string
    submission_rate: number
}

export interface IAIAttentionStudent {
    student_id: string
    name: string
    profile_image: string
    pending_count: number
    latest_assignment: string
    assignment_id: number
    class_name: string
}

export interface IDashboardResponse {
    class_count: number
    student_count: number
    due_today_count: number
    submission_rate_by_class: ISubmissionRateByClass[]
    ai_attention_students: IAIAttentionStudent[]
}
