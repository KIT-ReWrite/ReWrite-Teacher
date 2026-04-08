import { Card } from "@/shared/ui/Card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const chartData = [
    { name: "2학년 4반", rate: 85 },
    { name: "심화 논술반", rate: 92 },
]

export function SubmissionChart() {
    return (
        <Card className="p-6">
            <h2 className="text-lg font-bold mb-6">학급별 제출률</h2>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barSize={40}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Bar dataKey="rate" fill="#4ECDC4" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
}
