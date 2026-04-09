import { Card } from "@/shared/ui/Card"
import { Target } from "lucide-react"
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
} from "recharts"
import { useStudentMetrics } from "../../model/students.selector"

export function RadarChartCard({ studentId, studentName }: { studentId: string; studentName: string }) {
    const { metrics, isLoading } = useStudentMetrics(studentId)

    const radarData = metrics
        ? [
              { subject: "논리성", A: metrics.logical },
              { subject: "구조", A: metrics.structure },
              { subject: "문법", A: metrics.grammar },
              { subject: "창의성", A: metrics.creativity },
              { subject: "이해도", A: metrics.understanding },
          ]
        : []

    return (
        <Card className="p-6">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Target className="text-secondary" size={20} />
                역량 분석
            </h2>

            {isLoading ? (
                <div className="h-64 bg-gray-50 animate-pulse rounded-xl" />
            ) : radarData.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-text-secondary text-sm">
                    아직 분석 데이터가 없습니다.
                </div>
            ) : (
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                            <PolarGrid stroke="#E8F4F2" />
                            <PolarAngleAxis
                                dataKey="subject"
                                tick={{ fill: "#2D3436", fontSize: 12, fontWeight: 500 }}
                            />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar name={studentName} dataKey="A" stroke="#87CEEB" fill="#87CEEB" fillOpacity={0.5} />
                            <RechartsTooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </Card>
    )
}
