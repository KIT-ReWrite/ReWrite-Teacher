import { useMemo, useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router"
import { AxiosError } from "axios"
import { teacherSignupSchema, type TeacherSignupFormData } from "@/features/auth/model/auth.schema"
import { useTeacherSignupMutation } from "@/entities/auth/queries/auth.queries"

const useSignup = () => {
    const navigate = useNavigate()
    const { mutateAsync, isPending } = useTeacherSignupMutation()
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors, isValid, touchedFields },
        setError,
    } = useForm<TeacherSignupFormData>({
        resolver: zodResolver(teacherSignupSchema),
        mode: "onChange",
        defaultValues: {
            username: "",
            password: "",
            name: "",
            school: "",
            subject: "",
        },
    })

    const onSubmit: SubmitHandler<TeacherSignupFormData> = async (data) => {
        if (isPending) return

        try {
            await mutateAsync({ ...data, role: "teacher" })
            navigate("/login")
        } catch (error) {
            let errorMessage = "회원가입에 실패했습니다. 다시 시도해주세요."

            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message ?? errorMessage
            }

            setError("root.signupError", { type: "server", message: errorMessage })
        }
    }

    const isFormValid = useMemo(() => isValid && !isPending, [isValid, isPending])

    return {
        register,
        handleSignupSubmit: handleFormSubmit(onSubmit),
        errors,
        isFormValid,
        touchedFields,
        isPending,
        showPassword,
        handleTogglePassword: () => setShowPassword((prev) => !prev),
    }
}

export default useSignup
