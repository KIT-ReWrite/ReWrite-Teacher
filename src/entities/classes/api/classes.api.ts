import { ApiHelper } from "@/shared/api/api.base"
import { API_PATH } from "@/shared/api/api.path"
import type { IClass, IClassDetail, IClassStats, IAssignment, ICreateClassRequest } from "./classes.api.type"

export const classesApi = {
    /** 학급 목록 */
    getClasses: async () => ApiHelper.get<IClass[]>(API_PATH.CLASSES.LIST),

    /** 학급 생성 */
    createClass: async (body: ICreateClassRequest) => ApiHelper.post<IClass>(API_PATH.CLASSES.LIST, body),

    /** 학급 상세 */
    getClassDetail: async (classId: number) => ApiHelper.get<IClassDetail>(API_PATH.CLASSES.DETAIL(classId)),

    /** 학급 통계 */
    getClassStats: async (classId: number) => ApiHelper.get<IClassStats>(API_PATH.CLASSES.STATS(classId)),

    /** 학급별 과제 목록 */
    getAssignmentsByClass: async (classId: number) =>
        ApiHelper.get<IAssignment[]>(API_PATH.CLASSES.ASSIGNMENTS(classId)),
}
