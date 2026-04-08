import { Card } from "@/shared/ui/Card"
import { User } from "lucide-react"

export function SubmissionPanel({ submission }: any) {
    return (
        <Card className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                <User className="text-text-secondary" size={20} />
                <h2 className="font-bold text-text-primary">학생 제출물</h2>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50 p-5 rounded-xl border border-gray-100">
                <p className="text-text-primary leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                    {submission.text_content}
                </p>
            </div>
        </Card>
    )
}
