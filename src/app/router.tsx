import AssignmentCreatePage from "@/pages/assignments/AssignmentCreatePage"
import AssignmentsPage from "@/pages/assignments/AssignmentsPage"
import ClassDetailPage from "@/pages/classes/ClassDetailPage"
import ClassesPage from "@/pages/classes/ClassesPage"
import DashBoardPage from "@/pages/dashboard/DashBoard"
import LoginPage from "@/pages/login/LoginPage"
import MyPage from "@/pages/mypage/MyPage"
import SignupPage from "@/pages/signup/SignupPage"
import StudentDetailPage from "@/pages/students/StudentDetailPage"
import StudentsPage from "@/pages/students/StudentsPage"
import SubmissionsPage from "@/pages/submissions/SubmissionsPage"
import AuthGuard from "@/shared/lib/AuthGuard"
import RootRedirect from "@/shared/lib/RootRedirect"
import { createBrowserRouter } from "react-router"

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <RootRedirect />,
        },
        {
            children: [
                {
                    path: "/login",
                    element: <LoginPage />,
                },
                {
                    path: "/signup",
                    element: <SignupPage />,
                },
                {
                    // element: <AuthGuard />,
                    children: [
                        {
                            path: "/dashboard",
                            element: <DashBoardPage />,
                        },
                        {
                            path: "/mypage",
                            element: <MyPage />,
                        },
                        {
                            path: "/classes",
                            element: <ClassesPage />,
                        },
                        {
                            path: "/classes/:id",
                            element: <ClassDetailPage />,
                        },
                        {
                            path: "/classes/:id/students",
                            element: <StudentsPage />,
                        },
                        {
                            path: "/classes/:classId/students/:studentId",
                            element: <StudentDetailPage />,
                        },
                        {
                            path: "/assignments",
                            element: <AssignmentsPage />,
                        },
                        {
                            path: "/assignments/create",
                            element: <AssignmentCreatePage />,
                        },
                        {
                            path: "/assignments/:id/submissions",
                            element: <SubmissionsPage />,
                        },
                    ],
                },
            ],
        },
    ],
    {
        basename: "/",
    }
)
