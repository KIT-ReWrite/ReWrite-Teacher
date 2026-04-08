import { Card } from "@/shared/ui/Card"
import { Users, BookOpen, Clock } from "lucide-react"
import { mockClasses } from "@/shared/model/mockData"

export function StatsCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card className="p-6 flex items-center gap-4">
                <div className="p-3 bg-primary-light rounded-xl text-primary">
                    <Users size={24} />
                </div>
                <div>
                    <p className="text-sm text-text-secondary">전체 학급 수</p>
                    <p className="text-2xl font-bold">{mockClasses.length}개</p>
                </div>
            </Card>

            <Card className="p-6 flex items-center gap-4">
                <div className="p-3 bg-secondary-light rounded-xl text-secondary">
                    <BookOpen size={24} />
                </div>
                <div>
                    <p className="text-sm text-text-secondary">전체 학생 수</p>
                    <p className="text-2xl font-bold">40명</p>
                </div>
            </Card>

            <Card className="p-6 flex items-center gap-4">
                <div className="p-3 bg-red-50 rounded-xl text-accent">
                    <Clock size={24} />
                </div>
                <div>
                    <p className="text-sm text-text-secondary">오늘 마감 과제</p>
                    <p className="text-2xl font-bold">1건</p>
                </div>
            </Card>
        </div>
    )
}
