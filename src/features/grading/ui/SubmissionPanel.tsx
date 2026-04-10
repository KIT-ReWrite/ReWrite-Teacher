import { useState } from "react"
import { Card } from "@/shared/ui/Card"
import { User } from "lucide-react"
import type { ISubmissionDetail } from "@/entities/submissions/api/submissions.api.type"
import { ImageViewerModal } from "@/shared/ui/ImageViewerModal" // 네가 만든 모달 import

export function SubmissionPanel({ submission }: { submission: ISubmissionDetail }) {
    const images = submission.images.map((img) => `${import.meta.env.VITE_API_BASE_URL}${img.image_url}`)

    const [open, setOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    const openImage = (index: number) => {
        setCurrentIndex(index)
        setOpen(true)
    }

    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length)

    return (
        <Card className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                <User className="text-text-secondary" size={20} />
                <h2 className="font-bold text-text-primary">학생 제출물</h2>
            </div>

            {/* 이미지 썸네일 */}
            {images.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-4">
                    {submission.images.map((img, idx) => (
                        <button key={img.id} onClick={() => openImage(idx)} className="outline-none">
                            <img
                                src={`${import.meta.env.VITE_API_BASE_URL}${img.image_url}`}
                                alt="제출 이미지"
                                className="w-20 h-20 object-cover rounded-lg border border-gray-200 hover:opacity-80 transition-opacity"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* 텍스트 제출 */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-5 rounded-xl border border-gray-100">
                <p className="text-text-primary leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                    {submission.text_content}
                </p>
            </div>

            {/* 이미지 뷰어 모달 */}
            {open && (
                <ImageViewerModal
                    images={images}
                    currentIndex={currentIndex}
                    onClose={() => setOpen(false)}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
            )}
        </Card>
    )
}
