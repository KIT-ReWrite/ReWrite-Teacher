import { PageLayout } from "@/shared/ui/PageLayout"
import { StatsCards } from "@/features/dashboard/ui/StatsCard"
import { SubmissionChart } from "@/features/dashboard/ui/SubmissionChart"
import { FeedbackStudents } from "@/features/dashboard/ui/FeedbackStudents"
import { currentTeacher } from "@/shared/model/mockData"

function DashBoardPage() {
    return (
        <PageLayout
            title={`안녕하세요, ${currentTeacher.name} 선생님! 👨‍🏫`}
            description="오늘의 학급 현황을 확인하세요."
        >
            <StatsCards />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SubmissionChart />
                <FeedbackStudents />
            </div>
        </PageLayout>
    )
}

export default DashBoardPage
