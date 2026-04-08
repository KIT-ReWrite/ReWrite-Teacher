import { Card } from "@/shared/ui/Card"
import { Sparkles } from "lucide-react"

export function AIFeedbackPanel({ submission }: any) {
    return (
        <Card className="p-5 h-full flex flex-col border-t-4 border-t-primary">
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-primary" size={20} />
                <h2 className="font-bold text-text-primary">AI 분석 리포트</h2>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                <div>
                    <h3 className="text-xs font-bold text-text-secondary mb-1">요약</h3>
                    <div className="bg-primary-light/30 p-3 rounded-lg text-sm text-text-primary">
                        {submission.ai_feedback?.summary}
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-bold text-text-secondary mb-1">상세 분석</h3>
                    <p className="text-sm text-text-primary leading-relaxed">{submission.ai_feedback?.feedback}</p>
                </div>

                <div>
                    <h3 className="text-xs font-bold text-text-secondary mb-1">개선 제안</h3>
                    <p className="text-sm text-text-primary leading-relaxed">{submission.ai_feedback?.improvement}</p>
                </div>
            </div>
        </Card>
    )
}
