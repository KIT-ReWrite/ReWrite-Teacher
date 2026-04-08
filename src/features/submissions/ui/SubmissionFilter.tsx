import { Search } from "lucide-react"

export function SubmissionFilter() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input type="text" className="notion-input pl-10 text-sm" placeholder="학생 이름 검색" />
            </div>

            <div className="flex gap-2">
                <select className="notion-input text-sm p-4">
                    <option value="all">상태 전체</option>
                    <option value="feedback_ready">채점 대기</option>
                    <option value="graded">채점 완료</option>
                </select>
            </div>
        </div>
    )
}
