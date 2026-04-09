import { useNavigate } from "react-router-dom"
import { useStudents } from "../model/students.selector"
import { StudentRow } from "./StudentRow"

interface Props {
    classId: number
    search: string
}

export function StudentsTable({ classId, search }: Props) {
    const navigate = useNavigate()
    const { students, isLoading } = useStudents(classId)

    const filtered = students.filter((s) => s.name.includes(search) || s.student_number.includes(search))

    if (isLoading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-14 bg-gray-50 animate-pulse rounded-xl" />
                ))}
            </div>
        )
    }

    if (filtered.length === 0) {
        return (
            <div className="flex items-center justify-center py-16 text-text-secondary text-sm">학생이 없습니다.</div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 text-sm text-text-secondary">
                        <th className="pb-3 font-medium px-4">학번</th>
                        <th className="pb-3 font-medium px-4">이름</th>
                        <th className="pb-3 font-medium px-4">최근 점수</th>
                        <th className="pb-3 font-medium px-4 text-right">상세</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((student) => (
                        <StudentRow
                            key={student.id}
                            student={student}
                            onClick={() => navigate(`/classes/${classId}/students/${student.id}`)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
