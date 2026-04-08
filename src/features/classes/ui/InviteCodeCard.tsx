import { Copy, Check } from "lucide-react"
import { useState } from "react"

export function InviteCodeCard({ code }: any) {
    const [copiedCode, setCopiedCode] = useState(false)
    const copyToClipboard = () => {
        navigator.clipboard.writeText(code)
        setCopiedCode(true)
        setTimeout(() => setCopiedCode(false), 2000)
    }

    return (
        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm">
            <span className="text-sm text-text-secondary font-medium">초대 코드:</span>
            <span className="font-mono font-bold text-lg text-primary tracking-wider">{code}</span>
            <button
                onClick={copyToClipboard}
                className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary-light rounded-md transition-colors ml-1"
                title="코드 복사"
            >
                {copiedCode ? <Check size={18} className="text-success" /> : <Copy size={18} />}
            </button>
        </div>
    )
}
