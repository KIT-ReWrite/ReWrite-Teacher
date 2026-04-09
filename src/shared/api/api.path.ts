export const API_PATH = {
    AUTH: {
        SIGNUP: "/auth/register",
        LOGIN: "/auth/login",
        LOGOUT: "/auth/logout",
    },
    USER: {
        ME: "/users/me",
        PROFILE_IMAGE: "/users/me/profile-image",
    },
    DASHBOARD: {
        TEACHER: "/dashboard/teacher",
    },
    CLASSES: {
        LIST: "/classes",
        DETAIL: (id: number) => `/classes/${id}`,
        STATS: (id: number) => `/classes/${id}/stats`,
        ASSIGNMENTS: (id: number) => `/classes/${id}/assignments`,
    },
    ASSIGNMENTS: {
        LIST: "/assignments",
        DETAIL: (id: number) => `/assignments/${id}`,
    },
    SUBMISSIONS: {
        LIST: (assignmentId: number) => `/assignments/${assignmentId}/submissions`,
        DETAIL: (id: number) => `/submissions/${id}`,
        AI_FEEDBACK: (id: number) => `/submissions/${id}/ai-feedback`,
        TEACHER_FEEDBACK: (id: number) => `/submissions/${id}/teacher-feedback`,
        TEACHER_FEEDBACK_UPDATE: (id: number) => `/teacher-feedback/${id}`,
    },
    STUDENTS: {
        BY_CLASS: (classId: number) => `/classes/${classId}/students`,
        METRICS: (studentId: string) => `/students/${studentId}/metrics`,
        SCORES: (studentId: string) => `/students/${studentId}/scores`,
    },
} as const
