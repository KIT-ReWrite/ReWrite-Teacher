import { Card } from "@/shared/ui/Card"
import { User } from "lucide-react"
import type { ISubmissionDetail } from "@/entities/submissions/api/submissions.api.type"

export function SubmissionPanel({ submission }: { submission: ISubmissionDetail }) {
    return (
        <Card className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                <User className="text-text-secondary" size={20} />
                <h2 className="font-bold text-text-primary">학생 제출물</h2>
            </div>

            {/* 이미지 */}
            {submission.images.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-4">
                    {submission.images.map((img) => (
                        <a key={img.id} href={img.image_url} target="_blank" rel="noreferrer">
                            <img
                                src={img.image_url}
                                alt="제출 이미지"
                                className="w-20 h-20 object-cover rounded-lg border border-gray-200 hover:opacity-80 transition-opacity"
                            />
                        </a>
                    ))}
                </div>
            )}

            <div className="flex-1 overflow-y-auto bg-gray-50 p-5 rounded-xl border border-gray-100">
                <p className="text-text-primary leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                    {submission.text_content}
                </p>
            </div>
        </Card>
    )
}
