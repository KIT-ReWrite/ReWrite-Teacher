import { Card } from "@/shared/ui/Card"
import { Users, BookOpen, Clock } from "lucide-react"
import { useDashboardStats } from "../model/dashboard.selector"

export function StatsCards() {
    const { class_count, student_count, due_today_count, isLoading } = useDashboardStats()

    const stats = [
        {
            label: "전체 학급 수",
            value: `${class_count}개`,
            icon: Users,
            bg: "bg-primary-light",
            color: "text-primary",
        },
        {
            label: "전체 학생 수",
            value: `${student_count}명`,
            icon: BookOpen,
            bg: "bg-secondary-light",
            color: "text-secondary",
        },
        {
            label: "오늘 마감 과제",
            value: `${due_today_count}건`,
            icon: Clock,
            bg: "bg-red-50",
            color: "text-accent",
        },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {stats.map(({ label, value, icon: Icon, bg, color }) => (
                <Card key={label} className="p-6 flex items-center gap-4">
                    <div className={`p-3 ${bg} rounded-xl ${color}`}>
                        <Icon size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-text-secondary">{label}</p>
                        {isLoading ? (
                            <div className="h-8 w-16 bg-gray-100 animate-pulse rounded mt-1" />
                        ) : (
                            <p className="text-2xl font-bold">{value}</p>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    )
}
