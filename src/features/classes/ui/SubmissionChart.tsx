import { Card } from "@/shared/ui/Card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

const data = [
    { name: "과제1", rate: 95 },
    { name: "과제2", rate: 80 },
    { name: "과제3", rate: 60 },
]

export function SubmissionChart() {
    return (
        <div className="space-y-6">
            <Card className="p-6">
                <h2 className="text-lg font-bold mb-6">최근 과제 제출률</h2>
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 5,
                                bottom: 5,
                                left: -20,
                            }}
                            barSize={30}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8F4F2" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: "#636E72",
                                    fontSize: 12,
                                }}
                                dy={10}
                            />
                            <YAxis
                                domain={[0, 100]}
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: "#636E72",
                                    fontSize: 12,
                                }}
                            />
                            <Tooltip
                                cursor={{
                                    fill: "#F8FFFE",
                                }}
                                contentStyle={{
                                    borderRadius: "12px",
                                    border: "none",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                }}
                            />
                            <Bar dataKey="rate" fill="#87CEEB" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    )
}
