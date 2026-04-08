import { Card } from "@/shared/ui/Card"
import { AlertTriangle } from "lucide-react"
import { useLearningStats } from "../../model/students.selector"

export function WeakPointsCard() {
    const stats = useLearningStats()

    return (
        <Card className="p-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
                <AlertTriangle className="text-accent" size={20} />
                AI 분석: 집중 지도 필요 항목
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.weak_points.map((point: string, index: number) => (
                    <div
                        key={index}
                        className="w-full h-full p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center gap-3"
                    >
                        <div className="w-6 h-6 rounded-full bg-red-100 text-accent flex items-center justify-center text-xs font-bold">
                            {index + 1}
                        </div>

                        <span className="font-medium text-text-primary leading-tight">{point}</span>
                    </div>
                ))}
            </div>
        </Card>
    )
}
