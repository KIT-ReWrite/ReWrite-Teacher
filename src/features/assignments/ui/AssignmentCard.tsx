import { Card } from "@/shared/ui/Card"
import { Calendar, Users, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function AssignmentCard({ assignment }: any) {
    const navigate = useNavigate()

    return (
        <Card
            hoverable
            onClick={() => navigate(`/assignments/${assignment.id}/submissions`)}
            className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
            <div className="flex-1">
                <div className="text-xs font-medium text-text-secondary bg-gray-100 px-2 py-1 rounded-md inline-block mb-2">
                    {assignment.class_name}
                </div>

                <h3 className="text-lg font-bold text-text-primary mb-1">{assignment.title}</h3>

                <div className="flex items-center gap-4 text-sm text-text-secondary mt-2">
                    <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        마감: {new Date(assignment.due_date).toLocaleDateString("ko-KR")}
                    </span>

                    <span className="flex items-center gap-1.5">
                        <Users size={14} />
                        제출 15/25
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2 text-primary font-medium text-sm">
                제출물 확인 <ChevronRight size={16} />
            </div>
        </Card>
    )
}
