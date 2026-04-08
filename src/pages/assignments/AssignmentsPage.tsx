import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { PlusCircle } from "lucide-react"

import { AssignmentsFilter } from "@/features/assignments/ui/AssignmentsFilter"
import { AssignmentCard } from "@/features/assignments/ui/AssignmentCard"
import { getFilteredAssignments } from "@/features/assignments/model/assignments.selector"

function AssignmentsPage() {
    const navigate = useNavigate()
    const [selectedClass, setSelectedClass] = useState("all")

    const assignments = getFilteredAssignments(selectedClass)

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

            <div className="space-y-4">
                {assignments.map((assignment: any) => (
                    <AssignmentCard key={assignment.id} assignment={assignment} />
                ))}
            </div>
        </PageLayout>
    )
}

export default AssignmentsPage
