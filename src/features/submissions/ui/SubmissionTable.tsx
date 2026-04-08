import { StatusBadge } from "@/shared/ui/StatusBadge"
import { useNavigate } from "react-router-dom"

export function SubmissionTable({ submissions }: any) {
    const navigate = useNavigate()

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 text-sm text-text-secondary">
                        <th className="pb-3 font-medium px-4">학생 이름</th>
                        <th className="pb-3 font-medium px-4">제출 일시</th>
                        <th className="pb-3 font-medium px-4">상태</th>
                        <th className="pb-3 font-medium px-4 text-right">채점</th>
                    </tr>
                </thead>

                <tbody>
                    {submissions.map((sub: any) => (
                        <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4 font-medium text-text-primary">{sub.student_name}</td>

                            <td className="py-4 px-4 text-sm text-text-secondary">
                                {new Date(sub.submitted_at).toLocaleString("ko-KR")}
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
