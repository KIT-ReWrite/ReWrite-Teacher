import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { PlusCircle } from "lucide-react"
import { AssignmentsFilter } from "@/features/assignments/ui/AssignmentsFilter"
import { AssignmentCard } from "@/features/assignments/ui/AssignmentCard"
import { AssignmentEditModal } from "@/features/assignments/ui/AssignmentEditModal"
import { useFilteredAssignments } from "@/features/assignments/model/assignments.selector"
import { useDeleteAssignmentMutation } from "@/entities/assignments/queries/assignments.queries"
import type { IAssignment } from "@/entities/assignments/api/assignments.api.type"

function AssignmentsPage() {
    const navigate = useNavigate()
    const [selectedClass, setSelectedClass] = useState("all")
    const [editTarget, setEditTarget] = useState<IAssignment | null>(null)

    const classId = selectedClass === "all" ? undefined : Number(selectedClass)
    const { assignments, isLoading } = useFilteredAssignments(classId)
    const { mutate: deleteAssignment } = useDeleteAssignmentMutation()

    const handleDelete = (id: number) => {
        if (!confirm("과제를 삭제하시겠습니까? 관련 제출물도 모두 삭제됩니다.")) return
        deleteAssignment(id)
    }

    return (
        <PageLayout
            title="과제 관리"
            description="출제한 과제 목록과 제출 현황을 확인하세요."
            action={
                <button
                    onClick={() => navigate("/assignments/create")}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm"
                >
                    <PlusCircle size={18} />새 과제 만들기
                </button>
            }
        >
            <AssignmentsFilter selectedClass={selectedClass} onChange={setSelectedClass} />

            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-28 bg-gray-100 animate-pulse rounded-2xl" />
                    ))}
                </div>
            ) : assignments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-text-secondary">
                    <p className="text-lg font-medium">과제가 없습니다.</p>
                    <p className="text-sm mt-1">새 과제 만들기 버튼을 눌러 과제를 출제해보세요!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {assignments.map((assignment) => (
                        <AssignmentCard
                            key={assignment.id}
                            assignment={assignment}
                            onEdit={() => setEditTarget(assignment)}
                            onDelete={() => handleDelete(assignment.id)}
                        />
                    ))}
                </div>
            )}

            {/* 수정 모달 */}
            <AssignmentEditModal assignment={editTarget} onClose={() => setEditTarget(null)} />
        </PageLayout>
    )
}

export default AssignmentsPage
