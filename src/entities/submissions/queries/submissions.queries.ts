import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { submissionsApi } from "../api/submissions.api"

export const SUBMISSION_KEYS = {
    list: (assignmentId: number, status?: string) => ["submissions", assignmentId, status] as const,
    detail: (id: number) => ["submissions", id] as const,
    aiFeedback: (id: number) => ["submissions", id, "ai-feedback"] as const,
    teacherFeedback: (id: number) => ["submissions", id, "teacher-feedback"] as const,
}

/** 과제별 제출물 목록 */
export const useSubmissionsQuery = (assignmentId: number, status?: string) =>
    useQuery({
        queryKey: SUBMISSION_KEYS.list(assignmentId, status),
        queryFn: () => submissionsApi.getSubmissions(assignmentId, status),
        enabled: !!assignmentId,
    })

/** 제출물 상세 */
export const useSubmissionDetailQuery = (submissionId: number) =>
    useQuery({
        queryKey: SUBMISSION_KEYS.detail(submissionId),
        queryFn: () => submissionsApi.getSubmissionDetail(submissionId),
        enabled: !!submissionId,
    })

/** AI 피드백 조회 */
export const useAIFeedbackQuery = (submissionId: number) =>
    useQuery({
        queryKey: SUBMISSION_KEYS.aiFeedback(submissionId),
        queryFn: () => submissionsApi.getAIFeedback(submissionId),
        enabled: !!submissionId,
        retry: false, // 아직 분석 안 된 경우 재시도 안 함
    })

/** 교사 피드백 작성 */
export const useCreateTeacherFeedbackMutation = (submissionId: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (body: { score: number; feedback: string }) =>
            submissionsApi.createTeacherFeedback(submissionId, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: SUBMISSION_KEYS.detail(submissionId) })
            queryClient.invalidateQueries({ queryKey: ["submissions"] })
            toast.success("피드백이 저장되었습니다.")
        },
        onError: (error: any) => toast.error(error?.response?.data?.message ?? "피드백 저장에 실패했습니다."),
    })
}

/** 교사 피드백 수정 */
export const useUpdateTeacherFeedbackMutation = (submissionId: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ feedbackId, body }: { feedbackId: number; body: { score?: number; feedback?: string } }) =>
            submissionsApi.updateTeacherFeedback(feedbackId, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: SUBMISSION_KEYS.detail(submissionId) })
            toast.success("피드백이 수정되었습니다.")
        },
        onError: (error: any) => toast.error(error?.response?.data?.message ?? "피드백 수정에 실패했습니다."),
    })
}
