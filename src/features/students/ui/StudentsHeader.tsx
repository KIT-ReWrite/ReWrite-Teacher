import { Search } from "lucide-react"

interface Props {
    search: string
    onSearchChange: (v: string) => void
    totalCount: number
}

export function StudentsHeader({ search, onSearchChange, totalCount }: Props) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="notion-input pl-10 text-sm"
                    placeholder="이름 또는 학번 검색"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <div className="text-sm text-text-secondary">
                총 <span className="font-bold text-text-primary">{totalCount}</span>명
            </div>
        </div>
    )
}
