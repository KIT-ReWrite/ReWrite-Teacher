import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { BookOpen, Home, FileText, Users, PlusCircle, Menu, X, LogOut } from "lucide-react"
import { useLogoutMutation } from "@/entities/auth/queries/auth.queries"
import { useProfile } from "@/features/mypage/model/mypage.selector"

export function Navbar() {
    const location = useLocation()
    const navigate = useNavigate()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const { data } = useProfile()

    const { mutate: logout, isPending: isLoggingOut } = useLogoutMutation()

    const links = [
        { path: "/dashboard", label: "대시보드", icon: Home },
        { path: "/classes", label: "학급 관리", icon: Users },
        { path: "/assignments", label: "과제 관리", icon: FileText },
        { path: "/assignments/create", label: "과제 생성", icon: PlusCircle },
    ]

    const isActive = (path: string) => {
        if (path === "/" || path === "/dashboard") return location.pathname === path
        return location.pathname.startsWith(path)
    }

    const handleLogout = () => {
        logout(undefined, {
            onSettled: () => {
                localStorage.removeItem("accessToken")
                localStorage.removeItem("user")
                navigate("/login")
            },
        })
    }

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-border z-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
                <Link to="/dashboard" className="flex items-center gap-2 text-primary font-bold text-xl">
                    <BookOpen className="text-primary" />
                    <span>Re:Write</span>
                </Link>

                <div className="hidden md:flex items-center gap-1">
                    {links.map((link) => {
                        const Icon = link.icon
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors
                                    ${
                                        isActive(link.path)
                                            ? "bg-primary-light text-primary-hover"
                                            : "text-text-secondary hover:bg-gray-50 hover:text-text-primary"
                                    }`}
                            >
                                <Icon size={18} />
                                {link.label}
                            </Link>
                        )
                    })}
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        to="/mypage"
                        className="hidden sm:flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-full pr-4 transition-colors"
                    >
                        {/* ✅ profile_image 없으면 이니셜 폴백 */}
                        {data?.profile_image ? (
                            <img
                                src={`${import.meta.env.VITE_API_BASE_URL}${data.profile_image}`}
                                alt="Profile"
                                className="w-8 h-8 rounded-full bg-gray-100 object-cover"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary text-sm font-bold">
                                {data?.name?.charAt(0) ?? "T"}
                            </div>
                        )}
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-text-primary leading-none">
                                {data?.name} 선생님
                            </span>
                            <span className="text-xs text-text-secondary mt-1">선생님</span>
                        </div>
                    </Link>

                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="hidden sm:flex p-2 text-text-secondary hover:text-accent hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                        title="로그아웃"
                    >
                        <LogOut size={20} />
                    </button>

                    <button
                        className="md:hidden p-2 text-text-secondary"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* 모바일 메뉴 */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-border shadow-lg p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-3 p-3 mb-2 border-b border-gray-100">
                        {data?.profile_image ? (
                            <img
                                src={`${import.meta.env.VITE_API_BASE_URL}${data.profile_image}`}
                                alt="Profile"
                                className="w-10 h-10 rounded-full bg-gray-100 object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold">
                                {data?.name?.charAt(0) ?? "T"}
                            </div>
                        )}
                        <div>
                            <div className="font-medium">{data?.name ?? "선생님"}</div>
                            <div className="text-xs text-text-secondary">선생님</div>
                        </div>
                    </div>

                    {links.map((link) => {
                        const Icon = link.icon
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                                    ${
                                        isActive(link.path)
                                            ? "bg-primary-light text-primary-hover"
                                            : "text-text-secondary hover:bg-gray-50"
                                    }`}
                            >
                                <Icon size={20} />
                                {link.label}
                            </Link>
                        )
                    })}

                    <Link
                        to="/mypage"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:bg-gray-50"
                    >
                        <Users size={20} />
                        마이페이지
                    </Link>

                    <button
                        onClick={() => {
                            setIsMobileMenuOpen(false)
                            handleLogout()
                        }}
                        disabled={isLoggingOut}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-accent hover:bg-red-50 text-left disabled:opacity-50"
                    >
                        <LogOut size={20} />
                        {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
                    </button>
                </div>
            )}
        </nav>
    )
}
