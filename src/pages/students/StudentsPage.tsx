import { useParams, useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { Card } from "@/shared/ui/Card"
import { StudentsHeader } from "@/features/students/ui/StudentsHeader"
import { StudentsTable } from "@/features/students/ui/StudentsTable"
import { useClassDetail } from "@/features/students/model/students.selector"
import { ArrowLeft } from "lucide-react"

function StudentsPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const cls = useClassDetail(Number(id))
    if (!cls) return null

    return (
        <PageLayout title={`${cls.name} 학생 관리`} description="학급 학생들의 학습 현황을 확인하세요.">
            <button
                onClick={() => navigate(`/classes/${id}`)}
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors"
            >
                <ArrowLeft size={18} />
                학급 상세로 돌아가기
            </button>

            <Card className="p-6">
                <StudentsHeader />
                <StudentsTable classId={Number(id)} />
            </Card>
        </PageLayout>
    )
}

export default StudentsPage
