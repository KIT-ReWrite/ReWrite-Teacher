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

    const cls = useClassDetail(Number(id))
    if (!cls) return null

    return (
        <PageLayout>
            {/* 뒤로가기 */}
            <button onClick={() => navigate("/classes")} className="flex items-center gap-2 text-text-secondary mb-6">
                <ArrowLeft size={18} />
                학급 목록으로
            </button>

            {/* 헤더 */}
            <ClassHeader cls={cls} />

            {/* 컨텐츠 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <AssignmentList classId={cls.id} totalStudents={cls.student_count} />
                <SubmissionChart />
            </div>
        </PageLayout>
    )
}

export default ClassDetailPage
