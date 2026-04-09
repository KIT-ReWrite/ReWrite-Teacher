import { ApiHelper } from "@/shared/api/api.base"
import { API_PATH } from "@/shared/api/api.path"
import type { ISubmission, ISubmissionDetail, IAIFeedback, ITeacherFeedback } from "./submissions.api.type"

export const submissionsApi = {
    /** 과제별 제출물 목록 */
    getSubmissions: async (assignmentId: number, status?: string) =>
        ApiHelper.get<ISubmission[]>(API_PATH.SUBMISSIONS.LIST(assignmentId), {
            params: status && status !== "all" ? { status } : undefined,
        }),

    /** 제출물 상세 */
    getSubmissionDetail: async (submissionId: number) =>
        ApiHelper.get<ISubmissionDetail>(API_PATH.SUBMISSIONS.DETAIL(submissionId)),

    /** AI 피드백 조회 */
    getAIFeedback: async (submissionId: number) =>
        ApiHelper.get<IAIFeedback>(API_PATH.SUBMISSIONS.AI_FEEDBACK(submissionId)),

    /** 교사 피드백 조회 */
    getTeacherFeedback: async (submissionId: number) =>
        ApiHelper.get<ITeacherFeedback>(API_PATH.SUBMISSIONS.TEACHER_FEEDBACK(submissionId)),

    /** 교사 피드백 작성 */
    createTeacherFeedback: async (submissionId: number, body: { score: number; feedback: string }) =>
        ApiHelper.post<ITeacherFeedback>(API_PATH.SUBMISSIONS.TEACHER_FEEDBACK(submissionId), body),

    /** 교사 피드백 수정 */
    updateTeacherFeedback: async (feedbackId: number, body: { score?: number; feedback?: string }) =>
        ApiHelper.patch<ITeacherFeedback>(API_PATH.SUBMISSIONS.TEACHER_FEEDBACK_UPDATE(feedbackId), body),
}
