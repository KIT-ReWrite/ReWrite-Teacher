import { useNavigate } from "react-router-dom"
import { useStudents } from "../model/students.selector"
import { StudentRow } from "./StudentRow"

export function StudentsTable({ classId }: any) {
    const navigate = useNavigate()
    const students = useStudents()

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 text-sm text-text-secondary">
                        <th className="pb-3 font-medium px-4">학번</th>
                        <th className="pb-3 font-medium px-4">이름</th>
                        <th className="pb-3 font-medium px-4">과제 제출률</th>
                        <th className="pb-3 font-medium px-4">최근 점수</th>
                        <th className="pb-3 font-medium px-4 text-right">상세</th>
                    </tr>
                </thead>

                <tbody>
                    {students.map((student) => (
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
