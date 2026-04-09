import { useTeacherDashboardQuery } from "@/entities/dashboard/queries/dashboard.queries"

export function useDashboardStats() {
    const { data, isLoading } = useTeacherDashboardQuery()
    return {
        class_count: data?.class_count ?? 0,
        student_count: data?.student_count ?? 0,
        due_today_count: data?.due_today_count ?? 0,
        isLoading,
    }
}

export function useSubmissionChartData() {
    const { data, isLoading } = useTeacherDashboardQuery()
    const chartData =
        data?.submission_rate_by_class.map((item) => ({
            name: item.class_name,
            rate: item.submission_rate,
        })) ?? []
    return { chartData, isLoading }
}

export function useNeedsFeedbackStudents() {
    const { data, isLoading } = useTeacherDashboardQuery()
    return {
        students: data?.ai_attention_students ?? [],
        isLoading,
    }
}
