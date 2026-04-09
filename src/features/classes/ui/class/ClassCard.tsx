import { Card } from "@/shared/ui/Card"
import { useNavigate } from "react-router-dom"
import { Copy, Check, Users, BookOpen } from "lucide-react"
import { useState } from "react"
import type { IClass } from "@/entities/classes/api/classes.api.type"
import { useClassDetailQuery } from "@/entities/classes/queries/classes.queries"

export function ClassCard({ cls }: { cls: IClass }) {
    const navigate = useNavigate()
    const [copiedCode, setCopiedCode] = useState(false)
    const { data: detail } = useClassDetailQuery(cls.id)

    const copyToClipboard = (e: React.MouseEvent) => {
        e.stopPropagation()
        navigator.clipboard.writeText(cls.invite_code)
        setCopiedCode(true)
        setTimeout(() => setCopiedCode(false), 2000)
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
                                onClick={copyToClipboard}
                                className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary-light rounded-md transition-colors"
                                title="코드 복사"
                            >
                                {copiedCode ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <div className="flex items-center gap-1.5">
                            <Users size={16} />
                            {detail ? (
                                `학생 ${detail.student_count}명`
                            ) : (
                                <span className="w-12 h-4 bg-gray-100 animate-pulse rounded inline-block" />
                            )}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <BookOpen size={16} />
                            {detail ? (
                                `과제 ${detail.assignment_count}개`
                            ) : (
                                <span className="w-12 h-4 bg-gray-100 animate-pulse rounded inline-block" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
