import { ApiHelper } from "@/shared/api/api.base"
import { API_PATH } from "@/shared/api/api.path"
import type {
    IAssignment,
    IAssignmentDetail,
    ICreateAssignmentRequest,
    IUpdateAssignmentRequest,
} from "./assignments.api.type"

export const assignmentsApi = {
    /** 전체 과제 목록 (classId 필터) */
    getAssignments: async (classId?: number) =>
        ApiHelper.get<IAssignment[]>(API_PATH.ASSIGNMENTS.LIST, {
            params: classId ? { classId } : undefined,
        }),

    /** 과제 생성 */
    createAssignment: async (body: ICreateAssignmentRequest) =>
        ApiHelper.post<IAssignment>(API_PATH.ASSIGNMENTS.LIST, body),

    /** 과제 상세 */
    getAssignmentDetail: async (assignmentId: number) =>
        ApiHelper.get<IAssignmentDetail>(API_PATH.ASSIGNMENTS.DETAIL(assignmentId)),

    updateAssignment: async (assignmentId: number, body: IUpdateAssignmentRequest) =>
        ApiHelper.patch<IAssignment>(API_PATH.ASSIGNMENTS.DETAIL(assignmentId), body),

    // ✅ 추가
    deleteAssignment: async (assignmentId: number) =>
        ApiHelper.delete<{ message: string }>(API_PATH.ASSIGNMENTS.DETAIL(assignmentId)),
}
