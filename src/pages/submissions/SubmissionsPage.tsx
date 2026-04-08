import { useParams, useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { Card } from "@/shared/ui/Card"
import { ArrowLeft } from "lucide-react"

import { mockAssignments } from "@/shared/model/mockData"
import { getSubmissions } from "@/features/submissions/model/submissions.selector"

import { SubmissionHeader } from "@/features/submissions/ui/SubmissionHeader"
import { SubmissionFilter } from "@/features/submissions/ui/SubmissionFilter"
import { SubmissionTable } from "@/features/submissions/ui/SubmissionTable"

function SubmissionsPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const assignment = mockAssignments.find((a) => a.id === Number(id))

    const submissions = getSubmissions()

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
                <SubmissionFilter />
                <SubmissionTable submissions={submissions} />
            </Card>
        </PageLayout>
    )
}

export default SubmissionsPage
