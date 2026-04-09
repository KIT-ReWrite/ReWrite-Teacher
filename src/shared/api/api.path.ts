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
} as const
