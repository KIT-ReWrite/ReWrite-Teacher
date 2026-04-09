import { ApiHelper } from "@/shared/api/api.base"
import { API_PATH } from "@/shared/api/api.path"
import type { IDashboardResponse } from "./dashboard.api.type"

export const dashboardApi = {
    getTeacherDashboard: async () => ApiHelper.get<IDashboardResponse>(API_PATH.DASHBOARD.TEACHER),
}
