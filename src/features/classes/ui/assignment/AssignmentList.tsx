import { Card } from "@/shared/ui/Card"
import { FileText, PlusCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAssignments } from "../../model/classes.selector"
import { AssignmentItem } from "./AssignmentItem"

export function AssignmentList({ classId, totalStudents }: any) {
    const navigate = useNavigate()
    const assignments = useAssignments(classId)

    return (
        <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <FileText className="text-primary" size={20} />
                        과제 목록
                    </h2>
                    <button
                        onClick={() => navigate("/assignments/create")}
                        className="text-sm text-primary hover:text-primary-hover font-medium flex items-center gap-1"
                    >
                        <PlusCircle size={16} />새 과제
                    </button>
                </div>

                <div className="space-y-3">
                    {assignments.map((a) => (
                        <AssignmentItem key={a.id} assignment={a} totalStudents={totalStudents} />
                    ))}
                </div>
            </Card>
        </div>
    )
}
