import { ChevronRight } from "lucide-react"

export function StudentRow({ student, onClick }: any) {
    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer" onClick={onClick}>
            <td className="py-4 px-4 text-sm text-text-secondary">{student.student_number}</td>

            <td className="py-4 px-4 font-medium text-text-primary flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center text-xs font-bold">
                    {student.name.charAt(0)}
                </div>
                {student.name}
            </td>

            <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full ${
                                student.submission_rate < 60 ? "bg-accent" : "bg-success"
                            }`}
                            style={{
                                width: `${student.submission_rate}%`,
                            }}
                        />
                    </div>

                    <span className="text-sm text-text-secondary">{student.submission_rate}%</span>
                </div>
            </td>

            <td className="py-4 px-4 text-sm font-medium text-text-primary">{student.recent_score}점</td>

            <td className="py-4 px-4 text-right">
                <ChevronRight size={18} className="text-gray-400 inline-block" />
            </td>
        </tr>
    )
}
