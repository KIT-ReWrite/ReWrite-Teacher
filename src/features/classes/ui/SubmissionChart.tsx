import { Card } from "@/shared/ui/Card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { useClassAssignmentsQuery } from "@/entities/classes/queries/classes.queries"

export function SubmissionChart({ classId }: { classId: number }) {
    const { data: assignments, isLoading } = useClassAssignmentsQuery(classId)

    const chartData =
        assignments?.map((a, i) => ({
            name: `과제${i + 1}`,
            title: a.title,
            rate: 0, // 추후 submission 통계 연동 시 업데이트
        })) ?? []

    return (
        <div className="space-y-6">
            <Card className="p-6">
                <h2 className="text-lg font-bold mb-6">최근 과제 제출률</h2>

                {isLoading ? (
                    <div className="h-48 bg-gray-50 animate-pulse rounded-xl" />
                ) : chartData.length === 0 ? (
                    <div className="h-48 flex items-center justify-center text-text-secondary text-sm">
                        데이터가 없습니다.
                    </div>
                ) : (
                    <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }} barSize={30}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8F4F2" />
                                <XAxis
                                    dataKey="name"
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
                                <Tooltip
                                    cursor={{ fill: "#f8fffea5" }}
                                    contentStyle={{
                                        borderRadius: "12px",
                                        border: "none",
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                    }}
                                    formatter={(value, _, props) => [`${value}%`, props.payload.title]}
                                />
                                <Bar dataKey="rate" fill="#87CEEB" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </Card>
        </div>
    )
}
