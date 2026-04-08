import DashBoardPage from "@/pages/dashboard/DashBoard"
import LoginPage from "@/pages/login/LoginPage"
import MyPage from "@/pages/mypage/MyPage"
import SignupPage from "@/pages/signup/SignupPage"
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
                    ],
                },
            ],
        },
    ],
    {
        basename: "/",
    }
)
