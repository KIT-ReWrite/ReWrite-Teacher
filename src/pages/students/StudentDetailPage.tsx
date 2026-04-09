import { useParams, useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { ArrowLeft } from "lucide-react"
import { RadarChartCard } from "@/features/students/ui/detail/RadarChartCard"
import { ProgressChartCard } from "@/features/students/ui/detail/ProgressChartCard"
import { WeakPointsCard } from "@/features/students/ui/detail/WeakPointsCard"
import { useStudents } from "@/features/students/model/students.selector"

function StudentDetailPage() {
    const { classId, studentId } = useParams()
    const navigate = useNavigate()
    const { students, isLoading } = useStudents(Number(classId))

    const student = students.find((s) => s.id === studentId)

    if (isLoading) {
        return (
            <PageLayout>
                <div className="space-y-6">
                    <div className="h-16 w-64 bg-gray-100 animate-pulse rounded-2xl" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="h-80 bg-gray-100 animate-pulse rounded-2xl" />
                        <div className="h-80 bg-gray-100 animate-pulse rounded-2xl" />
                    </div>
                    <div className="h-40 bg-gray-100 animate-pulse rounded-2xl" />
                </div>
            </PageLayout>
        )
    }

    if (!student) return null

    return (
        <PageLayout>
            <button
                onClick={() => navigate(`/classes/${classId}/students`)}
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors"
            >
                <ArrowLeft size={18} />
                학생 목록으로
            </button>

            {/* 프로필 */}
            <div className="flex items-center gap-4 mb-8">
                {student.profile_image ? (
                    <img
                        src={student.profile_image}
                        alt={student.name}
                        className="w-16 h-16 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                        {student.name.charAt(0)}
                    </div>
                )}
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">{student.name}</h1>
                    <p className="text-text-secondary">{student.student_number}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <RadarChartCard studentId={student.id} studentName={student.name} />
                <ProgressChartCard studentId={student.id} />
            </div>

            <WeakPointsCard studentId={student.id} />
        </PageLayout>
    )
}

export default StudentDetailPage
