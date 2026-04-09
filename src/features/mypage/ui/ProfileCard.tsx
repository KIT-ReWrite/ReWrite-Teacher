import { useRef } from "react"
import { Camera } from "lucide-react"
import { useProfile } from "../model/mypage.selector"
import { useUpdateProfileImageMutation } from "@/entities/auth/queries/auth.queries"

export function ProfileCard() {
    const { data, isLoading } = useProfile()
    const { mutate: updateImage, isPending: isUploading } = useUpdateProfileImageMutation()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // 5MB 제한
        if (file.size > 5 * 1024 * 1024) {
            alert("이미지 크기는 5MB 이하여야 합니다.")
            return
        }

        updateImage(file)
        // input 초기화 (같은 파일 재업로드 허용)
        e.target.value = ""
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center pb-8 mb-8 border-b border-gray-100">
                <div className="w-24 h-24 rounded-full bg-gray-100 animate-pulse mb-4" />
                <div className="h-6 w-32 bg-gray-100 animate-pulse rounded" />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center pb-8 mb-8 border-b border-gray-100">
            <div className="relative mb-4">
                {/* 프로필 이미지 or 이니셜 */}
                {data?.profile_image ? (
                    <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${data.profile_image}`}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-primary flex items-center justify-center text-white text-3xl font-bold">
                        {data?.name?.charAt(0) ?? "T"}
                    </div>
                )}

                {/* 카메라 버튼 */}
                <button
                    type="button"
                    onClick={handleImageClick}
                    disabled={isUploading}
                    className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                    title="프로필 이미지 변경"
                >
                    {isUploading ? (
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Camera size={16} />
                    )}
                </button>

                {/* 숨김 파일 input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            <h2 className="text-xl font-bold">{data?.name} 선생님</h2>
            <p className="text-sm text-text-secondary mt-1">{data?.school}</p>
        </div>
    )
}
