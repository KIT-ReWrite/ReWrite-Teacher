import { ChevronRight } from "lucide-react"
import type { IStudent } from "@/entities/students/api/students.api.type"

interface Props {
    student: IStudent
    onClick: () => void
    latestScore?: number
}

export function StudentRow({ student, onClick, latestScore }: Props) {
    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer" onClick={onClick}>
            <td className="py-4 px-4 text-sm text-text-secondary">{student.student_number}</td>

            <td className="py-4 px-4 font-medium text-text-primary">
                <div className="flex items-center gap-3">
                    {student.profile_image ? (
                        <img
                            src={`${import.meta.env.VITE_API_BASE_URL}${student.profile_image}`}
                            alt={student.name}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {student.name.charAt(0)}
                        </div>
                    )}
                    {student.name}
                </div>
            </td>

            <td className="py-4 px-4 text-sm font-medium text-text-primary">
                {latestScore !== undefined ? `${latestScore}점` : "-"}
            </td>

            <td className="py-4 px-4 text-right">
                <ChevronRight size={18} className="text-gray-400 inline-block" />
            </td>
        </tr>
    )
}
