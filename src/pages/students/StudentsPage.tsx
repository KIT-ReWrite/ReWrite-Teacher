import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { Card } from "@/shared/ui/Card"
import { ArrowLeft } from "lucide-react"
import { StudentsHeader } from "@/features/students/ui/StudentsHeader"
import { StudentsTable } from "@/features/students/ui/StudentsTable"
import { useClassDetail, useStudents } from "@/features/students/model/students.selector"

function StudentsPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const classId = Number(id)
    const [search, setSearch] = useState("")

    const { cls, isLoading: clsLoading } = useClassDetail(classId)
    const { students } = useStudents(classId)

    if (clsLoading) {
        return (
            <PageLayout>
                <div className="h-8 w-48 bg-gray-100 animate-pulse rounded mb-6" />
                <div className="h-64 bg-gray-100 animate-pulse rounded-2xl" />
            </PageLayout>
        )
    }

    if (!cls) return null

    return (
        <PageLayout title={`${cls.class.name} 학생 관리`} description="학급 학생들의 학습 현황을 확인하세요.">
            <button
                onClick={() => navigate(`/classes/${id}`)}
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors"
            >
                <ArrowLeft size={18} />
                학급 상세로 돌아가기
            </button>

            <Card className="p-6">
                <StudentsHeader search={search} onSearchChange={setSearch} totalCount={students.length} />
                <StudentsTable classId={classId} search={search} />
            </Card>
        </PageLayout>
    )
}

export default StudentsPage
