import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export function CreateClassModal({ isOpen, onClose }: any) {
    const [name, setName] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        alert(`${name} 생성됨`)
        onClose()
        setName("")
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        className="bg-white p-6 rounded-xl"
                    >
                        <button onClick={onClose}>
                            <X />
                        </button>

                        <form onSubmit={handleSubmit}>
                            <input value={name} onChange={(e) => setName(e.target.value)} />

                            <button type="submit">만들기</button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
