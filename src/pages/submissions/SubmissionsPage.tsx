import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { Card } from "@/shared/ui/Card"
import { ArrowLeft } from "lucide-react"
import { useAssignmentDetailQuery } from "@/entities/assignments/queries/assignments.queries"
import { useSubmissions } from "@/features/submissions/model/submissions.selector"
import { SubmissionHeader } from "@/features/submissions/ui/SubmissionHeader"
import { SubmissionFilter } from "@/features/submissions/ui/SubmissionFilter"
import { SubmissionTable } from "@/features/submissions/ui/SubmissionTable"

function SubmissionsPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const assignmentId = Number(id)

    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("all")

    const { data: assignment, isLoading: assignmentLoading } = useAssignmentDetailQuery(assignmentId)
    const { submissions, isLoading: submissionsLoading } = useSubmissions(
        assignmentId,
        status === "all" ? undefined : status
    )

    // 이름 검색 필터 (클라이언트 사이드)
    const filtered = submissions.filter((s) => s.student.name.includes(search))

    if (assignmentLoading) {
        return (
            <PageLayout>
                <div className="space-y-4">
                    <div className="h-6 w-32 bg-gray-100 animate-pulse rounded" />
                    <div className="h-24 bg-gray-100 animate-pulse rounded-2xl" />
                    <div className="h-64 bg-gray-100 animate-pulse rounded-2xl" />
                </div>
            </PageLayout>
        )
    }

    if (!assignment) return null

    return (
        <PageLayout>
            <button
                onClick={() => navigate("/assignments")}
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6"
            >
                <ArrowLeft size={18} />
                과제 목록으로
            </button>

            <SubmissionHeader assignment={assignment} />

            <Card className="p-6">
                <SubmissionFilter
                    search={search}
                    status={status}
                    onSearchChange={setSearch}
                    onStatusChange={setStatus}
                />

                {submissionsLoading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-14 bg-gray-50 animate-pulse rounded-xl" />
                        ))}
                    </div>
                ) : (
                    <SubmissionTable submissions={filtered} />
                )}
            </Card>
        </PageLayout>
    )
}

export default SubmissionsPage
