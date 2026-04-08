import { useState } from "react"
import { PageLayout } from "@/shared/ui/PageLayout"
import { ClassList } from "@/features/classes/ui/class/ClassList"
import { CreateClassModal } from "@/features/classes/ui/CreateClassModal"
import { Plus } from "lucide-react"

function ClassesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <PageLayout
            title="학급 관리"
            description="운영 중인 학급을 관리하세요."
            action={
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl"
                >
                    <Plus size={18} />
                    학급 만들기
                </button>
            }
        >
            <ClassList />
            <CreateClassModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </PageLayout>
    )
}

export default ClassesPage
