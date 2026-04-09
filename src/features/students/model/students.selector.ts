import {
    useStudentsByClassQuery,
    useStudentMetricsQuery,
    useStudentScoresQuery,
} from "@/entities/students/queries/students.queries"
import { useClassDetailQuery } from "@/entities/classes/queries/classes.queries"

export function useStudents(classId: number) {
    const { data, isLoading } = useStudentsByClassQuery(classId)
    return { students: data ?? [], isLoading }
}

export function useClassDetail(id: number) {
    const { data, isLoading } = useClassDetailQuery(id)
    return { cls: data, isLoading }
}

export function useStudentMetrics(studentId: string) {
    const { data, isLoading } = useStudentMetricsQuery(studentId)
    return { metrics: data ?? null, isLoading }
}

export function useStudentScores(studentId: string) {
    const { data, isLoading } = useStudentScoresQuery(studentId)
    return { scores: data ?? [], isLoading }
}
