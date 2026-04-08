import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { ArrowLeft } from "lucide-react"

import { mockSubmissions, mockAssignments } from "@/shared/model/mockData"

import { AIFeedbackPanel } from "@/features/grading/ui/AIFeedbackPanel"
import { SubmissionPanel } from "@/features/grading/ui/SubmissionPanel"
import { GradingPanel } from "@/features/grading/ui/GradingPanel"

function GradingPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const submission = mockSubmissions.find((s) => s.id === Number(id))
    const assignment = mockAssignments.find((a) => a.id === submission?.assignment_id)

    const [score, setScore] = useState(submission?.teacher_feedback?.score?.toString() || "")
    const [feedback, setFeedback] = useState(submission?.teacher_feedback?.feedback || "")

    if (!submission || !assignment) return null

    const handleSave = () => {
        alert("채점이 완료되었습니다.")
        navigate(`/assignments/${assignment.id}/submissions`)
    }

    return (
        <PageLayout>
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                    <ArrowLeft size={18} />
                    목록으로
                </button>

                <div className="text-sm font-medium text-text-secondary">
                    <span className="text-text-primary font-bold">{submission.student_name}</span> 학생의 제출물
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-180px)] min-h-200">
                <div className="lg:col-span-7">
                    <SubmissionPanel submission={submission} />
                </div>

                <div className="lg:col-span-5 h-full flex flex-col">
                    <GradingPanel
                        score={score}
                        setScore={setScore}
                        feedback={feedback}
                        setFeedback={setFeedback}
                        onSave={handleSave}
                    />
                </div>

                <div className="lg:col-span-12 w-full h-full flex flex-col">
                    <AIFeedbackPanel submission={submission} />
                </div>
            </div>
        </PageLayout>
    )
}

export default GradingPage
