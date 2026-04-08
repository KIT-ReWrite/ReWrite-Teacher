import { PageLayout } from "@/shared/ui/PageLayout"
import { ProfileCard } from "@/features/mypage/ui/ProfileCard"
import { ProfileForm } from "@/features/mypage/ui/ProfileForm"
import { Card } from "@/shared/ui/Card"

function MyPage() {
    return (
        <PageLayout title="마이페이지" description="선생님 프로필 정보를 관리합니다.">
            <div className="max-w-2xl mx-auto">
                <Card className="p-8 mb-6">
                    <ProfileCard />
                    <ProfileForm />
                </Card>
            </div>
        </PageLayout>
    )
}

export default MyPage
