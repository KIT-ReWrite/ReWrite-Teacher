import { Card } from "@/shared/ui/Card"
import { AlertCircle, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useNeedsFeedbackStudents } from "../model/dashboard.selector"

export function FeedbackStudents() {
    const navigate = useNavigate()
    const students = useNeedsFeedbackStudents()

    return (
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <AlertCircle size={20} />
                <h2 className="text-lg font-bold">AI 추천: 피드백 필요 학생</h2>
            </div>

            <div className="space-y-4">
                {students.map((student) => (
                    <div key={student.id} className="flex justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                            <h3 className="font-bold">
                                {student.name} <span className="text-xs text-gray-400">{student.student_number}</span>
                            </h3>
                            <p className="text-xs text-red-500">최근 점수 {student.recent_score}점</p>
                        </div>

                        <button onClick={() => navigate(`/teacher/classes/1/students`)}>
                            <ChevronRight />
                        </button>
                    </div>
                ))}
            </div>
        </Card>
    )
}
