import { StatusBadge } from "@/shared/ui/StatusBadge"
import { useNavigate } from "react-router-dom"

export function AssignmentItem({ assignment, totalStudents }: any) {
    const navigate = useNavigate()

    return (
        <div
            key={assignment.id}
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
                <div className="text-sm text-text-secondary">
                    제출 <span className="font-bold text-text-primary">15</span>/{totalStudents}
                </div>
                <StatusBadge status={assignment.status} />
            </div>
        </div>
    )
}
