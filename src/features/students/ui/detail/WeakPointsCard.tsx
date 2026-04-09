import { Card } from "@/shared/ui/Card"
import { AlertTriangle } from "lucide-react"
import { useStudentMetrics } from "../../model/students.selector"

export function WeakPointsCard({ studentId }: { studentId: string }) {
    const { metrics, isLoading } = useStudentMetrics(studentId)

    // 점수 낮은 순으로 약점 추출
    const weakPoints = metrics
        ? [
              { label: "논리성", score: metrics.logical },
              { label: "구조", score: metrics.structure },
              { label: "문법", score: metrics.grammar },
              { label: "창의성", score: metrics.creativity },
              { label: "이해도", score: metrics.understanding },
          ]
              .sort((a, b) => a.score - b.score)
              .slice(0, 3)
        : []

    return (
        <Card className="p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="text-accent" size={20} />
                AI 분석: 집중 지도 필요 항목
            </h2>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-gray-50 animate-pulse rounded-xl" />
                    ))}
                </div>
            ) : weakPoints.length === 0 ? (
                <div className="flex items-center justify-center py-8 text-text-secondary text-sm">
                    아직 분석 데이터가 없습니다.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {weakPoints.map((point, index) => (
                        <div
                            key={index}
                            className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center gap-3"
                        >
                            <div className="w-6 h-6 rounded-full bg-red-100 text-accent flex items-center justify-center text-xs font-bold shrink-0">
                                {index + 1}
                            </div>
                            <div>
                                <div className="font-medium text-text-primary text-sm">{point.label}</div>
                                <div className="text-xs text-text-secondary">{point.score}점</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    )
}
