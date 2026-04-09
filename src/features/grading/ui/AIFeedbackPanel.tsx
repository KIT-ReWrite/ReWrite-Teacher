import { Card } from "@/shared/ui/Card"
import { Sparkles } from "lucide-react"
import type { ISubmissionDetail } from "@/entities/submissions/api/submissions.api.type"

const METRIC_LABELS: Record<string, string> = {
    logical: "논리성",
    structure: "구조",
    grammar: "문법",
    creativity: "창의성",
    understanding: "이해도",
}

export function AIFeedbackPanel({ submission }: { submission: ISubmissionDetail }) {
    const ai = submission.ai_feedback

    if (!ai) {
        return (
            <Card className="p-5 border-t-4 border-t-primary">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-primary" size={20} />
                    <h2 className="font-bold text-text-primary">AI 분석 리포트</h2>
                </div>
                <div className="flex items-center justify-center py-8 text-text-secondary text-sm">
                    {submission.status === "submitted" ? "AI 분석이 진행 중입니다..." : "AI 분석 결과가 없습니다."}
                </div>
            </Card>
        )
    }

    return (
        <Card className="p-5 h-full flex flex-col border-t-4 border-t-primary">
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-primary" size={20} />
                <h2 className="font-bold text-text-primary">AI 분석 리포트</h2>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                {/* 요약 */}
                <div>
                    <h3 className="text-xs font-bold text-text-secondary mb-1">요약</h3>
                    <div className="bg-primary-light/30 p-3 rounded-lg text-sm text-text-primary">{ai.summary}</div>
                </div>

                {/* 상세 분석 */}
                <div>
                    <h3 className="text-xs font-bold text-text-secondary mb-2">상세 분석</h3>
                    <div className="space-y-2">
                        {Object.entries(ai.detail_analysis).map(([key, val]) => (
                            <div key={key} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-text-secondary w-14">
                                            {METRIC_LABELS[key] ?? key}
                                        </span>
                                        <span className="text-sm text-text-primary">{val.comment}</span>
                                    </div>
                                    <span
                                        className={`text-sm font-bold shrink-0 ${
                                            val.score >= 80
                                                ? "text-success"
                                                : val.score >= 60
                                                  ? "text-primary"
                                                  : "text-accent"
                                        }`}
                                    >
                                        {val.score}점
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 개선 제안 */}
                <div>
                    <h3 className="text-xs font-bold text-text-secondary mb-2">개선 제안</h3>
                    <ul className="space-y-2">
                        {ai.improvement_suggestions.map((suggestion, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-text-primary">
                                <span className="w-5 h-5 rounded-full bg-primary-light text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                    {i + 1}
                                </span>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    )
}
