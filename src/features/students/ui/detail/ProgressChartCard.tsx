import { Card } from "@/shared/ui/Card"
import { TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"
import { useStudentScores } from "../../model/students.selector"

export function ProgressChartCard({ studentId }: { studentId: string }) {
    const { scores, isLoading } = useStudentScores(studentId)

    const chartData = scores.map((s, i) => ({
        week: `과제${i + 1}`,
        score: s.score,
        title: s.assignment.title,
    }))

    return (
        <Card className="p-6">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="text-primary" size={20} />
                성취도 추이
            </h2>

            {isLoading ? (
                <div className="h-64 bg-gray-50 animate-pulse rounded-xl" />
            ) : chartData.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-text-secondary text-sm">
                    아직 점수 기록이 없습니다.
                </div>
            ) : (
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8F4F2" />
                            <XAxis
                                dataKey="week"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#636E72", fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                domain={[0, 100]}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#636E72", fontSize: 12 }}
                            />
                            <RechartsTooltip
                                contentStyle={{
                                    borderRadius: "12px",
                                    border: "none",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                }}
                                formatter={(value, _, props) => [`${value}점`, props.payload.title]}
                            />
                            <Line
                                type="monotone"
                                dataKey="score"
                                stroke="#4ECDC4"
                                strokeWidth={3}
                                dot={{ r: 4, fill: "#4ECDC4", strokeWidth: 2, stroke: "#fff" }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </Card>
    )
}
