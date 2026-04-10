import { StatusBadge } from "@/shared/ui/StatusBadge"
import { useNavigate } from "react-router-dom"
import type { ISubmission } from "@/entities/submissions/api/submissions.api.type"

export function SubmissionTable({ submissions }: { submissions: ISubmission[] }) {
    const navigate = useNavigate()

    if (submissions.length === 0) {
        return (
            <div className="flex items-center justify-center py-16 text-text-secondary text-sm">제출물이 없습니다.</div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 text-sm text-text-secondary">
                        <th className="pb-3 font-medium px-4">학생 이름</th>
                        <th className="pb-3 font-medium px-4">번호</th>
                        <th className="pb-3 font-medium px-4">제출 일시</th>
                        <th className="pb-3 font-medium px-4">상태</th>
                        <th className="pb-3 font-medium px-4 text-right">채점</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((sub) => (
                        <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                    {sub.student.profile_image ? (
                                        <img
                                            src={`${import.meta.env.VITE_API_BASE_URL}${sub.student.profile_image}`}
                                            alt={sub.student.name}
                                            className="w-7 h-7 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                                            {sub.student.name.charAt(0)}
                                        </div>
                                    )}
                                    <span className="font-medium text-text-primary">{sub.student.name}</span>
                                </div>
                            </td>
                            <td className="py-4 px-4 text-sm text-text-secondary">{sub.student.student_number}</td>
                            <td className="py-4 px-4 text-sm text-text-secondary">
                                {sub.submitted_at ? new Date(sub.submitted_at).toLocaleString("ko-KR") : "-"}
                            </td>
                            <td className="py-4 px-4">
                                <StatusBadge status={sub.status} />
                            </td>
                            <td className="py-4 px-4 text-right">
                                <button
                                    onClick={() => navigate(`/submissions/${sub.id}`)}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors
                                        ${
                                            sub.status === "graded"
                                                ? "bg-gray-100 text-text-secondary hover:bg-gray-200"
                                                : "bg-primary text-white hover:bg-primary-hover"
                                        }`}
                                >
                                    {sub.status === "graded" ? "수정하기" : "채점하기"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
