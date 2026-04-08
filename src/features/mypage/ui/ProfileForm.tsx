import { User, Building, Book } from "lucide-react"
import { useTeacherProfile } from "../model/mypage.selector"

export function ProfileForm() {
    const teacher = useTeacherProfile()

    return (
        <form className="space-y-5">
            <div>
                <label className="block text-sm font-medium mb-1">이름</label>
                <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input className="notion-input pl-10" defaultValue={teacher.name} />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">학교</label>
                <div className="relative">
                    <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input className="notion-input pl-10" defaultValue={teacher.school} />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">담당 과목</label>
                <div className="relative">
                    <Book className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input className="notion-input pl-10" defaultValue={teacher.subject} />
                </div>
            </div>

            <button type="button" className="w-full bg-primary text-white py-3 rounded-xl">
                변경사항 저장
            </button>
        </form>
    )
}
