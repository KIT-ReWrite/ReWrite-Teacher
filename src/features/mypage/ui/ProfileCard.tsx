import { Camera } from "lucide-react"
import { useTeacherProfile } from "../model/mypage.selector"

export function ProfileCard() {
    const teacher = useTeacherProfile()

    return (
        <div className="flex flex-col items-center pb-8 mb-8 border-b border-gray-100">
            <div className="relative mb-4">
                <img
                    src={teacher.profile_image}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md">
                    <Camera size={16} />
                </button>
            </div>

            <h2 className="text-xl font-bold">{teacher.name} 선생님</h2>
        </div>
    )
}
