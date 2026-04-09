import { useNavigate } from "react-router-dom"
import type { IAssignment } from "@/entities/classes/api/classes.api.type"

export function AssignmentItem({ assignment }: { assignment: IAssignment; totalStudents: number }) {
    const navigate = useNavigate()

    const isPast = new Date(assignment.due_date) < new Date()

    return (
        <div
            onClick={() => navigate(`/assignments/${assignment.id}/submissions`)}
            className="p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary-light/10 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
            <div>
                <h3 className="font-bold text-text-primary mb-1">{assignment.title}</h3>
                <p className="text-xs text-text-secondary">
                    마감: {new Date(assignment.due_date).toLocaleDateString("ko-KR")}
                </p>
            </div>
            <div className="flex items-center gap-3">
                <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                        isPast ? "bg-gray-100 text-gray-500" : "bg-primary-light text-primary"
                    }`}
                >
                    {isPast ? "마감" : "진행중"}
                </span>
            </div>
        </div>
    )
}
