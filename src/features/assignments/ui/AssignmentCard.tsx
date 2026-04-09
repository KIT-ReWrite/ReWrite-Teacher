import { Card } from "@/shared/ui/Card"
import { Calendar, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { IAssignment } from "@/entities/assignments/api/assignments.api.type"

export function AssignmentCard({ assignment }: { assignment: IAssignment }) {
    const navigate = useNavigate()

    const isPast = new Date(assignment.due_date) < new Date()

    return (
        <Card
            hoverable
            onClick={() => navigate(`/assignments/${assignment.id}/submissions`)}
            className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
            <div className="flex-1">
                <div className="text-xs font-medium text-text-secondary bg-gray-100 px-2 py-1 rounded-md inline-block mb-2">
                    {assignment.class?.name ?? "-"}
                </div>

                <h3 className="text-lg font-bold text-text-primary mb-1">{assignment.title}</h3>

                <div className="flex items-center gap-4 text-sm text-text-secondary mt-2">
                    <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        마감: {new Date(assignment.due_date).toLocaleDateString("ko-KR")}
                    </span>
                    <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            isPast ? "bg-gray-100 text-gray-500" : "bg-primary-light text-primary"
                        }`}
                    >
                        {isPast ? "마감" : "진행중"}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2 text-primary font-medium text-sm">
                제출물 확인 <ChevronRight size={16} />
            </div>
        </Card>
    )
}
