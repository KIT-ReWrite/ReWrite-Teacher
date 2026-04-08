import { Card } from "@/shared/ui/Card"
import { TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"
import { useLearningStats } from "../../model/students.selector"

export function ProgressChartCard() {
    const stats = useLearningStats()

    return (
        <Card className="p-6">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="text-primary" size={20} />
                성취도 추이
            </h2>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.weekly_scores}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8F4F2" />

                        <XAxis dataKey="week" />
                        <YAxis domain={[0, 100]} />

                        <RechartsTooltip />

                        <Line type="monotone" dataKey="score" stroke="#4ECDC4" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
}
