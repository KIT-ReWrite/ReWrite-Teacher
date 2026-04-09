import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { User, Building, Book } from "lucide-react"
import { useProfile } from "../model/mypage.selector"
import { useUpdateMeMutation } from "@/entities/auth/queries/auth.queries"
import type { IUpdateUserRequest } from "@/entities/auth/api/auth.api.type"

export function ProfileForm() {
    const { data: teacher, isLoading } = useProfile()
    const { mutate: updateMe, isPending } = useUpdateMeMutation()

    const {
        register,
        handleSubmit,
        reset,
        formState: { isDirty },
    } = useForm<IUpdateUserRequest>({
        defaultValues: {
            name: "",
            school: "",
            subject: "",
        },
    })

    // 데이터 로드 후 폼 초기화
    useEffect(() => {
        if (teacher) {
            reset({
                name: teacher.name,
                school: teacher.school,
                subject: teacher.subject ?? "",
            })
        }
    }, [teacher, reset])

    const onSubmit = (data: IUpdateUserRequest) => {
        updateMe(data)
    }

    if (isLoading) {
        return (
            <div className="space-y-5">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 bg-gray-100 animate-pulse rounded-xl" />
                ))}
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
                <label className="block text-sm font-medium mb-1">이름</label>
                <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input className="notion-input pl-10" placeholder="이름을 입력하세요" {...register("name")} />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">학교</label>
                <div className="relative">
                    <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input className="notion-input pl-10" placeholder="학교명을 입력하세요" {...register("school")} />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">담당 과목</label>
                <div className="relative">
                    <Book className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        className="notion-input pl-10"
                        placeholder="담당 과목을 입력하세요"
                        {...register("subject")}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={!isDirty || isPending}
                className="w-full bg-primary text-white py-3 rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isPending ? "저장 중..." : "변경사항 저장"}
            </button>
        </form>
    )
}
