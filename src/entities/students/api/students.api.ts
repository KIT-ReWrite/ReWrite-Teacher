import { ApiHelper } from "@/shared/api/api.base"
import { API_PATH } from "@/shared/api/api.path"
import type { IStudent, IStudentMetrics, IStudentScoreHistory } from "./students.api.type"

export const studentsApi = {
    /** 학급 학생 목록 */
    getStudentsByClass: async (classId: number) => ApiHelper.get<IStudent[]>(API_PATH.STUDENTS.BY_CLASS(classId)),

    /** 학생 역량 조회 */
    getMetrics: async (studentId: string) => ApiHelper.get<IStudentMetrics>(API_PATH.STUDENTS.METRICS(studentId)),

    /** 학생 점수 추이 */
    getScores: async (studentId: string) => ApiHelper.get<IStudentScoreHistory[]>(API_PATH.STUDENTS.SCORES(studentId)),
}
