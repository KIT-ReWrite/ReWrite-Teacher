import { Link } from "react-router"
import { motion } from "framer-motion"
import { BookOpen, Mail, Lock, User, Building, Eye, EyeOff } from "lucide-react"
import useLogin from "@/features/auth/hooks/useLogin"
import useSignup from "@/features/auth/hooks/useSignup"

interface IAuthProp {
    type: "login" | "signup"
}

const AuthForm = ({ type }: IAuthProp) => {
    const login = useLogin()
    const signup = useSignup()

    const isLogin = type === "login"

    // ✅ hook 유니온 대신 공통 속성만 따로 추출
    const isPending = isLogin ? login.isPending : signup.isPending
    const isFormValid = isLogin ? login.isFormValid : signup.isFormValid
    const showPassword = isLogin ? login.showPassword : signup.showPassword
    const handleTogglePassword = isLogin ? login.handleTogglePassword : signup.handleTogglePassword

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-md rounded-2xl shadow-card p-8 border border-border"
        >
            {/* 헤더 */}
            <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-12 bg-primary-light rounded-2xl flex items-center justify-center mb-4">
                    <BookOpen className="stroke-primary" size={28} />
                </div>
                <h1 className="text-2xl font-bold text-text-primary">Re:Write</h1>
                <p className="text-text-secondary mt-2">{isLogin ? "로그인" : "회원가입"}</p>
            </div>

            <form onSubmit={isLogin ? login.handleLoginSubmit : signup.handleSignupSubmit} className="space-y-4">
                {/* 회원가입 전용 필드 */}
                {!isLogin && (
                    <>
                        {/* 이름 */}
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-1">이름</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="notion-input pl-10"
                                    placeholder="이름을 입력하세요"
                                    {...signup.register("name")}
                                />
                            </div>
                            {signup.errors.name && (
                                <p className="text-red-500 text-xs mt-1">{signup.errors.name.message}</p>
                            )}
                        </div>

                        {/* 학교명 */}
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-1">학교명</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Building className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="notion-input pl-10"
                                    placeholder="학교명을 입력하세요"
                                    {...signup.register("school")}
                                />
                            </div>
                            {signup.errors.school && (
                                <p className="text-red-500 text-xs mt-1">{signup.errors.school.message}</p>
                            )}
                        </div>

                        {/* 담당과목 */}
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-1">담당과목</label>
                            <input
                                type="text"
                                className="notion-input p-4"
                                placeholder="담당과목을 입력하세요"
                                {...signup.register("subject")}
                            />
                            {signup.errors.subject && (
                                <p className="text-red-500 text-xs mt-1">{signup.errors.subject.message}</p>
                            )}
                        </div>
                    </>
                )}

                {/* 아이디 - ✅ hook.register 대신 각각 명시 */}
                <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">아이디</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="notion-input pl-10"
                            placeholder="아이디를 입력하세요"
                            {...(isLogin ? login.register("username") : signup.register("username"))}
                        />
                    </div>
                    {isLogin
                        ? login.errors.username && (
                              <p className="text-red-500 text-xs mt-1">{login.errors.username.message}</p>
                          )
                        : signup.errors.username && (
                              <p className="text-red-500 text-xs mt-1">{signup.errors.username.message}</p>
                          )}
                </div>

                {/* 비밀번호 - ✅ hook.register 대신 각각 명시 */}
                <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">비밀번호</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="notion-input pl-10 pr-10"
                            placeholder="비밀번호를 입력하세요"
                            {...(isLogin ? login.register("password") : signup.register("password"))}
                        />
                        <button
                            type="button"
                            onClick={handleTogglePassword}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                                <Eye className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                    </div>
                    {isLogin
                        ? login.errors.password && (
                              <p className="text-red-500 text-xs mt-1">{login.errors.password.message}</p>
                          )
                        : signup.errors.password && (
                              <p className="text-red-500 text-xs mt-1">{signup.errors.password.message}</p>
                          )}
                </div>

                {/* 서버 에러 메시지 */}
                {isLogin && (login.errors as any).root?.loginError && (
                    <p className="text-red-500 text-sm text-center">{(login.errors as any).root.loginError.message}</p>
                )}
                {!isLogin && (signup.errors as any).root?.signupError && (
                    <p className="text-red-500 text-sm text-center">
                        {(signup.errors as any).root.signupError.message}
                    </p>
                )}

                {/* 제출 버튼 */}
                <button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-xl transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? (isLogin ? "로그인 중..." : "가입 중...") : isLogin ? "로그인" : "회원가입"}
                </button>
            </form>

            {/* 하단 링크 */}
            <div className="mt-6 text-center text-sm text-text-secondary">
                {isLogin ? "계정이 없으신가요? " : "계정이 있으신가요? "}
                <Link to={isLogin ? "/signup" : "/login"} className="text-primary font-medium hover:underline">
                    {isLogin ? "회원가입" : "로그인"}
                </Link>
            </div>
        </motion.div>
    )
}

export default AuthForm
