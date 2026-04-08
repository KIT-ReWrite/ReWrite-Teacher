import { Card } from "@/shared/ui/Card"
import { CheckCircle } from "lucide-react"

export function GradingPanel({ score, setScore, feedback, setFeedback, onSave }: any) {
    return (
        <Card className="p-5 h-full flex flex-col border-t-4 border-t-secondary">
            <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="text-secondary" size={20} />
                <h2 className="font-bold text-text-primary">교사 채점</h2>
            </div>

            <div className="flex-1 flex flex-col space-y-4">
                <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">점수</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            className="notion-input text-center text-lg font-bold text-secondary"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                        />
                        <span className="text-text-secondary font-medium">/ 100</span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    <label className="block text-sm font-medium text-text-primary mb-1">교사 피드백</label>
                    <textarea
                        className="notion-textarea flex-1 resize-none p-2"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </div>

                <button
                    onClick={onSave}
                    className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium transition-colors"
                >
                    채점 완료 및 저장
                </button>
            </div>
        </Card>
    )
}
