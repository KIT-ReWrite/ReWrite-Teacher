import { Card } from "@/shared/ui/Card"
import { Calendar, ChevronRight, Pencil, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { IAssignment } from "@/entities/assignments/api/assignments.api.type"

interface Props {
    assignment: IAssignment
    onEdit?: () => void
    onDelete?: () => void
}

export function AssignmentCard({ assignment, onEdit, onDelete }: Props) {
    const navigate = useNavigate()
    const isPast = new Date(assignment.due_date) < new Date()

    return (
        <Card className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* 클릭 영역 */}
            <div
                className="flex-1 cursor-pointer"
                onClick={() => navigate(`/assignments/${assignment.id}/submissions`)}
            >
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

            {/* 버튼 영역 */}
            <div className="flex items-center gap-2 shrink-0">
                {/* 수정 */}
                {onEdit && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onEdit()
                        }}
                        className="p-2 text-text-secondary hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
                        title="과제 수정"
                    >
                        <Pencil size={16} />
                    </button>
                )}

                {/* 삭제 */}
                {onDelete && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onDelete()
                        }}
                        className="p-2 text-text-secondary hover:text-accent hover:bg-red-50 rounded-lg transition-colors"
                        title="과제 삭제"
                    >
                        <Trash2 size={16} />
                    </button>
                )}

                {/* 제출물 확인 */}
                <button
                    onClick={() => navigate(`/assignments/${assignment.id}/submissions`)}
                    className="flex items-center gap-1.5 px-3 py-2 text-primary font-medium text-sm hover:bg-primary-light rounded-lg transition-colors"
                >
                    제출물 확인 <ChevronRight size={16} />
                </button>
            </div>
        </Card>
    )
}
