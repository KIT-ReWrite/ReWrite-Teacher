import { useQuery } from "@tanstack/react-query"
import { dashboardApi } from "../api/dashboard.api"

export const DASHBOARD_KEYS = {
    teacher: ["dashboard", "teacher"] as const,
}

/** 교사 대시보드 조회 */
export const useTeacherDashboardQuery = () =>
    useQuery({
        queryKey: DASHBOARD_KEYS.teacher,
        queryFn: () => dashboardApi.getTeacherDashboard(),
        staleTime: 1000 * 60, // 1분 캐시
    })
