import { Users } from "lucide-react"
import { Link } from "react-router-dom"
import { InviteCodeCard } from "../InviteCodeCard"

export function ClassHeader({ cls }: any) {
    return (
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
            <div>
                <h1 className="text-2xl font-bold">{cls.name}</h1>

                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                        <Users size={16} />
                        학생 {cls.student_count}명
                    </span>

                    <Link to={`/classes/${cls.id}/students`} className="text-primary">
                        학생 목록 보기
                    </Link>
                </div>
            </div>

            <InviteCodeCard code={cls.invite_code} />
        </div>
    )
}
