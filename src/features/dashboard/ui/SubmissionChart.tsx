import { Card } from "@/shared/ui/Card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useSubmissionChartData } from "../model/dashboard.selector"

export function SubmissionChart() {
    const { chartData, isLoading } = useSubmissionChartData()

    return (
        <Card className="p-6">
            <h2 className="text-lg font-bold mb-6">학급별 제출률</h2>

            {isLoading ? (
                <div className="h-64 bg-gray-50 animate-pulse rounded-xl" />
            ) : chartData.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-text-secondary text-sm">
                    데이터가 없습니다.
                </div>
            ) : (
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} barSize={40}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} unit="%" />
                            <Tooltip cursor={{ fill: "#f8fffea5" }} formatter={(value) => [`${value}%`, "제출률"]} />
                            <Bar dataKey="rate" fill="#4ECDC4" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </Card>
    )
}
