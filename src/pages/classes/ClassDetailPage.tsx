import { useNavigate, useParams } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { AssignmentList } from "@/features/classes/ui/assignment/AssignmentList"
import { SubmissionChart } from "@/features/classes/ui/SubmissionChart"
import { useClassDetail } from "@/features/classes/model/classes.selector"
import { ArrowLeft } from "lucide-react"
import { ClassHeader } from "@/features/classes/ui/class/ClassHeader"

function ClassDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { cls, isLoading } = useClassDetail(Number(id))

    if (isLoading) {
        return (
            <PageLayout>
                <div className="space-y-4">
                    <div className="h-8 w-48 bg-gray-100 animate-pulse rounded" />
                    <div className="h-32 bg-gray-100 animate-pulse rounded-2xl" />
                </div>
            </PageLayout>
        )
    }

    if (!cls) return null

    // ClassHeader에서 쓰는 형태로 정리
    const classInfo = {
        id: cls.class.id,
        name: cls.class.name,
        invite_code: cls.class.invite_code,
        student_count: cls.student_count,
    }

    return (
        <PageLayout>
            <button
                onClick={() => navigate("/classes")}
                className="flex items-center gap-2 text-text-secondary mb-6 hover:text-text-primary transition-colors"
            >
                <ArrowLeft size={18} />
                학급 목록으로
            </button>

            <ClassHeader cls={classInfo} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <AssignmentList classId={cls.class.id} totalStudents={cls.student_count} />
                <SubmissionChart classId={cls.class.id} />
            </div>
        </PageLayout>
    )
}

export default ClassDetailPage
