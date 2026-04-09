import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { classesApi } from "../api/classes.api"
import type { ICreateClassRequest } from "../api/classes.api.type"

export const CLASSES_KEYS = {
    all: ["classes"] as const,
    detail: (id: number) => ["classes", id] as const,
    stats: (id: number) => ["classes", id, "stats"] as const,
    assignments: (id: number) => ["classes", id, "assignments"] as const,
}

/** 학급 목록 */
export const useClassesQuery = () =>
    useQuery({
        queryKey: CLASSES_KEYS.all,
        queryFn: () => classesApi.getClasses(),
    })

/** 학급 상세 */
export const useClassDetailQuery = (classId: number) =>
    useQuery({
        queryKey: CLASSES_KEYS.detail(classId),
        queryFn: () => classesApi.getClassDetail(classId),
        enabled: !!classId,
    })

/** 학급 통계 */
export const useClassStatsQuery = (classId: number) =>
    useQuery({
        queryKey: CLASSES_KEYS.stats(classId),
        queryFn: () => classesApi.getClassStats(classId),
        enabled: !!classId,
    })

/** 학급별 과제 목록 */
export const useClassAssignmentsQuery = (classId: number) =>
    useQuery({
        queryKey: CLASSES_KEYS.assignments(classId),
        queryFn: () => classesApi.getAssignmentsByClass(classId),
        enabled: !!classId,
    })

/** 학급 생성 */
export const useCreateClassMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (body: ICreateClassRequest) => classesApi.createClass(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CLASSES_KEYS.all })
            toast.success("학급이 생성되었습니다.")
        },
        onError: (error: any) => toast.error(error?.response?.data?.message ?? "학급 생성에 실패했습니다."),
    })
}
