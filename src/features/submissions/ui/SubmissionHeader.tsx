import { Clock } from "lucide-react"
import type { IAssignmentDetail } from "@/entities/assignments/api/assignments.api.type"

export function SubmissionHeader({ assignment }: { assignment: IAssignmentDetail }) {
    return (
        <div className="mb-8">
            <div className="text-sm font-medium text-primary mb-2">{assignment.class?.name ?? "-"}</div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">{assignment.title}</h1>
            <div className="flex items-center gap-4 text-sm text-text-secondary">
                <span className="flex items-center gap-1.5">
                    <Clock size={16} />
                    마감일: {new Date(assignment.due_date).toLocaleString("ko-KR")}
                </span>
                <span>
                    제출 {assignment.stats?.submitted_count ?? 0} / {assignment.stats?.total_students ?? 0}명
                </span>
            </div>
        </div>
    )
}
