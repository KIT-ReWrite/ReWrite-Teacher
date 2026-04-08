import { mockStudents } from "@/shared/model/mockData"

export function useNeedsFeedbackStudents() {
    return mockStudents.filter((s) => s.recent_score < 70).slice(0, 3)
}
