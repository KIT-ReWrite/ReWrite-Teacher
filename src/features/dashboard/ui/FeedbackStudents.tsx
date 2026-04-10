import { Card } from "@/shared/ui/Card"
import { AlertCircle, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useNeedsFeedbackStudents } from "../model/dashboard.selector"

export function FeedbackStudents() {
    const navigate = useNavigate()
    const { students, isLoading } = useNeedsFeedbackStudents()

    return (
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <AlertCircle size={20} />
                <h2 className="text-lg font-bold">AI 추천: 피드백 필요 학생</h2>
            </div>

            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-gray-50 animate-pulse rounded-xl" />
                    ))}
                </div>
            ) : students.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-text-secondary text-sm">
                    피드백이 필요한 학생이 없습니다. 🎉
                </div>
            ) : (
                <div className="space-y-4">
                    {students.map((student) => (
                        <div
                            key={student.student_id}
                            className="flex justify-between items-center p-4 bg-gray-50 rounded-xl"
                        >
                            <div className="flex items-center gap-3">
                                {student.profile_image ? (
                                    <img
                                        src={`${import.meta.env.VITE_API_BASE_URL}${student.profile_image}`}
                                        alt={student.name}
                                        className="w-9 h-9 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shrink-0">
                                        {student.name.charAt(0)}
                                    </div>
                                )}

                                <div>
                                    <h3 className="font-bold text-sm">
                                        {student.name}
                                        <span className="text-xs text-gray-400 ml-1 font-normal">
                                            {student.class_name}
                                        </span>
                                    </h3>
                                    <p className="text-xs text-red-500">
                                        미완료 {student.pending_count}건 · {student.latest_assignment}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate(`/students/${student.student_id}`)}
                                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    )
}
