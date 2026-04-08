import { Clock } from "lucide-react"

export function SubmissionHeader({ assignment }: any) {
    return (
        <div className="mb-8">
            <div className="text-sm font-medium text-primary mb-2">{assignment.class_name}</div>

            <h1 className="text-2xl font-bold text-text-primary mb-2">{assignment.title}</h1>

            <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Clock size={16} />
                마감일: {new Date(assignment.due_date).toLocaleString("ko-KR")}
            </div>
        </div>
    )
}
