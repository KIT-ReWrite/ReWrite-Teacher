import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { ArrowLeft } from "lucide-react"
import { useSubmissionDetailQuery } from "@/entities/submissions/queries/submissions.queries"
import {
    useCreateTeacherFeedbackMutation,
    useUpdateTeacherFeedbackMutation,
} from "@/entities/submissions/queries/submissions.queries"
import { AIFeedbackPanel } from "@/features/grading/ui/AIFeedbackPanel"
import { SubmissionPanel } from "@/features/grading/ui/SubmissionPanel"
import { GradingPanel } from "@/features/grading/ui/GradingPanel"

function GradingPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const submissionId = Number(id)

    const { data: submission, isLoading } = useSubmissionDetailQuery(submissionId)

    const [score, setScore] = useState("")
    const [feedback, setFeedback] = useState("")

    // 기존 피드백 있으면 초기값 세팅
    useEffect(() => {
        if (submission?.teacher_feedback) {
            setScore(submission.teacher_feedback.score.toString())
            setFeedback(submission.teacher_feedback.feedback)
        }
    }, [submission])

    const { mutate: createFeedback, isPending: isCreating } = useCreateTeacherFeedbackMutation(submissionId)
    const { mutate: updateFeedback, isPending: isUpdating } = useUpdateTeacherFeedbackMutation(submissionId)

    const isPending = isCreating || isUpdating

    const handleSave = () => {
        const scoreNum = Number(score)
        if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
            alert("점수는 0~100 사이로 입력해주세요.")
            return
        }
        if (!feedback.trim()) {
            alert("피드백을 입력해주세요.")
            return
        }

        if (submission?.teacher_feedback) {
            // 수정
            updateFeedback(
                { feedbackId: submission.teacher_feedback.id, body: { score: scoreNum, feedback } },
                { onSuccess: () => navigate(-1) }
            )
        } else {
            // 신규
            createFeedback({ score: scoreNum, feedback }, { onSuccess: () => navigate(-1) })
        }
    }

    if (isLoading) {
        return (
            <PageLayout>
                <div className="space-y-6">
                    <div className="h-8 w-48 bg-gray-100 animate-pulse rounded" />
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-7 h-96 bg-gray-100 animate-pulse rounded-2xl" />
                        <div className="lg:col-span-5 h-96 bg-gray-100 animate-pulse rounded-2xl" />
                        <div className="lg:col-span-12 h-48 bg-gray-100 animate-pulse rounded-2xl" />
                    </div>
                </div>
            </PageLayout>
        )
    }

    if (!submission) return null

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
                    <span className="text-text-primary font-bold">{submission.student.name}</span> 학생의 제출물
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
                        isPending={isPending}
                        isEdit={!!submission.teacher_feedback}
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
