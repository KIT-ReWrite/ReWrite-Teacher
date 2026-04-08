import AuthForm from "@/features/auth/ui/AuthForm"
/**
 * @description 로그인 페이지 컴포넌트
 */
const LoginPage = () => {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <AuthForm type="login" />
        </div>
    )
}

export default LoginPage
