import { Card } from "@/shared/ui/Card"
import { useNavigate } from "react-router-dom"
import { Copy, Check, Users, BookOpen } from "lucide-react"
import { useState } from "react"

export function ClassCard({ cls }: any) {
    const navigate = useNavigate()
    const [copiedCode, setCopiedCode] = useState<string | null>(null)

    const copyToClipboard = (code: string, e: React.MouseEvent) => {
        e.stopPropagation()
        navigator.clipboard.writeText(code)
        setCopiedCode(code)
        setTimeout(() => setCopiedCode(null), 2000)
    }

    return (
        <Card hoverable onClick={() => navigate(`/classes/${cls.id}`)} className="h-full flex flex-col">
            <div className="h-24 bg-linear-to-r from-primary-light to-secondary-light p-5 flex items-end">
                <h3 className="text-xl font-bold text-text-primary">{cls.name}</h3>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-4 mb-4">
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <div className="text-sm text-text-secondary font-medium">초대 코드</div>
                        <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-primary tracking-wider">{cls.invite_code}</span>
                            <button
                                onClick={(e) => copyToClipboard(cls.invite_code, e)}
                                className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary-light rounded-md transition-colors"
                                title="코드 복사"
                            >
                                {copiedCode === cls.invite_code ? (
                                    <Check size={16} className="text-success" />
                                ) : (
                                    <Copy size={16} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <div className="flex items-center gap-1.5">
                            <Users size={16} />
                            학생 {cls.student_count}명
                        </div>
                        <div className="flex items-center gap-1.5">
                            <BookOpen size={16} />
                            과제 4개
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
