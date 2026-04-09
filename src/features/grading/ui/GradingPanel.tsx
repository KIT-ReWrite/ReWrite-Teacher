import { Card } from "@/shared/ui/Card"
import { CheckCircle } from "lucide-react"

interface Props {
    score: string
    setScore: (v: string) => void
    feedback: string
    setFeedback: (v: string) => void
    onSave: () => void
    isPending: boolean
    isEdit: boolean
}

export function GradingPanel({ score, setScore, feedback, setFeedback, onSave, isPending, isEdit }: Props) {
    return (
        <Card className="p-5 h-full flex flex-col border-t-4 border-t-secondary">
            <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="text-secondary" size={20} />
                <h2 className="font-bold text-text-primary">교사 채점</h2>
                {isEdit && (
                    <span className="ml-auto text-xs text-text-secondary bg-gray-100 px-2 py-1 rounded-full">
                        수정 모드
                    </span>
                )}
            </div>

            <div className="flex-1 flex flex-col space-y-4">
                {/* 점수 */}
                <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">점수 (0 ~ 100)</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            min={0}
                            max={100}
                            className="notion-input text-center text-lg font-bold text-secondary"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            placeholder="0"
                        />
                        <span className="text-text-secondary font-medium">/ 100</span>
                    </div>
                </div>

                {/* 피드백 */}
                <div className="flex-1 flex flex-col">
                    <label className="block text-sm font-medium text-text-primary mb-1">교사 피드백</label>
                    <textarea
                        className="notion-textarea flex-1 resize-none p-2"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="학생에게 전달할 피드백을 입력하세요."
                    />
                </div>

                <button
                    onClick={onSave}
                    disabled={isPending || !score || !feedback.trim()}
                    className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? "저장 중..." : isEdit ? "피드백 수정하기" : "채점 완료 및 저장"}
                </button>
            </div>
        </Card>
    )
}
