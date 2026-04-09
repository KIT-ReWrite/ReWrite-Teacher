import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useCreateClassMutation } from "@/entities/classes/queries/classes.queries"

export function CreateClassModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [name, setName] = useState("")
    const { mutate: createClass, isPending } = useCreateClassMutation()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim()) return

        createClass(
            { name },
            {
                onSuccess: () => {
                    setName("")
                    onClose()
                },
            }
        )
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* 배경 dimmed */}
                    <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

                    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold">새 학급 만들기</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">학급 이름</label>
                                    <input
                                        className="notion-input p-2"
                                        placeholder="예) 1학년 2반"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        autoFocus
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={!name.trim() || isPending}
                                    className="w-full bg-primary text-white py-3 rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isPending ? "생성 중..." : "학급 만들기"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
