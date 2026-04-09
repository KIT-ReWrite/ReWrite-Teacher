import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { assignmentsApi } from "../api/assignments.api"
import type { ICreateAssignmentRequest } from "../api/assignments.api.type"

export const ASSIGNMENT_KEYS = {
    all: ["assignments"] as const,
    filtered: (classId?: number) => ["assignments", classId] as const,
    detail: (id: number) => ["assignments", id] as const,
}

/** 전체 과제 목록 */
export const useAssignmentsQuery = (classId?: number) =>
    useQuery({
        queryKey: ASSIGNMENT_KEYS.filtered(classId),
        queryFn: () => assignmentsApi.getAssignments(classId),
    })

/** 과제 상세 */
export const useAssignmentDetailQuery = (assignmentId: number) =>
    useQuery({
        queryKey: ASSIGNMENT_KEYS.detail(assignmentId),
        queryFn: () => assignmentsApi.getAssignmentDetail(assignmentId),
        enabled: !!assignmentId,
    })

/** 과제 생성 */
export const useCreateAssignmentMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (body: ICreateAssignmentRequest) => assignmentsApi.createAssignment(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.all })
            toast.success("과제가 생성되었습니다.")
        },
        onError: (error: any) => toast.error(error?.response?.data?.message ?? "과제 생성에 실패했습니다."),
    })
}
