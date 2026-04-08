import { useParams, useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { Card } from "@/shared/ui/Card"
import { mockStudents, mockLearningStats } from "@/shared/model/mockData"
import { ArrowLeft, Target, TrendingUp, AlertTriangle } from "lucide-react"
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts"

function StudentDetailPage() {
    const { classId, studentId } = useParams()
    const navigate = useNavigate()
    const student = mockStudents.find((s: any) => s.id === Number(studentId))
    if (!student) return null
    return (
        <PageLayout>
            <button
                onClick={() => navigate(`/classes/${classId}/students`)}
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors"
            >
                <ArrowLeft size={18} />
                학생 목록으로
            </button>

            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-primary-light text-primary flex items-center justify-center text-2xl font-bold">
                    {student.name.charAt(0)}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">{student.name}</h1>
                    <p className="text-text-secondary">{student.student_number}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Radar Chart */}
                <Card className="p-6">
                    <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <Target className="text-secondary" size={20} />
                        역량 분석
                    </h2>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={mockLearningStats.radar_data}>
                                <PolarGrid stroke="#E8F4F2" />
                                <PolarAngleAxis
                                    dataKey="subject"
                                    tick={{
                                        fill: "#2D3436",
                                        fontSize: 12,
                                        fontWeight: 500,
                                    }}
                                />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name={student.name}
                                    dataKey="A"
                                    stroke="#87CEEB"
                                    fill="#87CEEB"
                                    fillOpacity={0.5}
                                />
                                <RechartsTooltip />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Progress Chart */}
                <Card className="p-6">
                    <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <TrendingUp className="text-primary" size={20} />
                        성취도 추이
                    </h2>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={mockLearningStats.weekly_scores}
                                margin={{
                                    top: 5,
                                    right: 20,
                                    bottom: 5,
                                    left: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8F4F2" />
                                <XAxis
                                    dataKey="week"
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
                                <RechartsTooltip
                                    contentStyle={{
                                        borderRadius: "12px",
                                        border: "none",
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#4ECDC4"
                                    strokeWidth={3}
                                    dot={{
                                        r: 4,
                                        fill: "#4ECDC4",
                                        strokeWidth: 2,
                                        stroke: "#fff",
                                    }}
                                    activeDot={{
                                        r: 6,
                                        strokeWidth: 0,
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Weak Points */}
            <Card className="p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <AlertTriangle className="text-accent" size={20} />
                    AI 분석: 집중 지도 필요 항목
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {mockLearningStats.weak_points.map((point: any, index: any) => (
                        <div
                            key={index}
                            className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-start gap-3"
                        >
                            <div className="w-6 h-6 rounded-full bg-red-100 text-accent flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                {index + 1}
                            </div>
                            <div className="font-medium text-text-primary text-sm">{point}</div>
                        </div>
                    ))}
                </div>
            </Card>
        </PageLayout>
    )
}

export default StudentDetailPage
