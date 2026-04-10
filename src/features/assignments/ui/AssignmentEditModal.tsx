import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"
import { X, Calendar as CalendarIcon } from "lucide-react"
import { useUpdateAssignmentMutation } from "@/entities/assignments/queries/assignments.queries"
import type { IAssignment, IUpdateAssignmentRequest } from "@/entities/assignments/api/assignments.api.type"

interface Props {
    assignment: IAssignment | null
    onClose: () => void
}

interface FormData {
    title: string
    description: string
    dueDate: string
    dueTime: string
}

export function AssignmentEditModal({ assignment, onClose }: Props) {
    const { mutate: updateAssignment, isPending } = useUpdateAssignmentMutation()

    const {
        register,
        handleSubmit,
        reset,
        formState: { isDirty },
    } = useForm<FormData>()

    useEffect(() => {
        if (assignment) {
            const date = new Date(assignment.due_date)
            reset({
                title: assignment.title,
                description: assignment.description,
                dueDate: date.toISOString().split("T")[0],
                dueTime: date.toTimeString().slice(0, 5),
            })
        }
    }, [assignment, reset])

    const onSubmit = (data: FormData) => {
        if (!assignment) return
        const due_date = new Date(`${data.dueDate}T${data.dueTime}`).toISOString()
        const body: IUpdateAssignmentRequest = {
            title: data.title,
            description: data.description,
            due_date,
        }
        updateAssignment({ id: assignment.id, body }, { onSuccess: onClose })
    }

    return (
        <AnimatePresence>
            {assignment && (
                <>
                    <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
                    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold">과제 수정</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">과제 제목</label>
                                    <input
                                        className="notion-input p-2"
                                        placeholder="과제 제목을 입력하세요"
                                        {...register("title", { required: true })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">과제 설명</label>
                                    <textarea
                                        className="notion-textarea resize-none h-28 p-2"
                                        placeholder="과제 설명을 입력하세요"
                                        {...register("description", { required: true })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">마감 날짜</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <CalendarIcon className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="date"
                                                className="notion-input pl-10 p-2"
                                                {...register("dueDate", { required: true })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">마감 시간</label>
                                        <input
                                            type="time"
                                            className="notion-input p-2"
                                            {...register("dueTime", { required: true })}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 py-3 rounded-xl border border-gray-200 text-text-secondary hover:bg-gray-50 transition-colors"
                                    >
                                        취소
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!isDirty || isPending}
                                        className="flex-1 py-3 rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isPending ? "저장 중..." : "저장하기"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
