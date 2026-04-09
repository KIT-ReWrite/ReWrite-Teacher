import { useQuery } from "@tanstack/react-query"
import { studentsApi } from "../api/students.api"

export const STUDENT_KEYS = {
    byClass: (classId: number) => ["students", "class", classId] as const,
    metrics: (studentId: string) => ["students", studentId, "metrics"] as const,
    scores: (studentId: string) => ["students", studentId, "scores"] as const,
}

/** 학급 학생 목록 */
export const useStudentsByClassQuery = (classId: number) =>
    useQuery({
        queryKey: STUDENT_KEYS.byClass(classId),
        queryFn: () => studentsApi.getStudentsByClass(classId),
        enabled: !!classId,
    })

/** 학생 역량 조회 */
export const useStudentMetricsQuery = (studentId: string) =>
    useQuery({
        queryKey: STUDENT_KEYS.metrics(studentId),
        queryFn: () => studentsApi.getMetrics(studentId),
        enabled: !!studentId,
    })

/** 학생 점수 추이 */
export const useStudentScoresQuery = (studentId: string) =>
    useQuery({
        queryKey: STUDENT_KEYS.scores(studentId),
        queryFn: () => studentsApi.getScores(studentId),
        enabled: !!studentId,
    })
