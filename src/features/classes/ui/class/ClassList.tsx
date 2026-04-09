import { motion } from "framer-motion"
import { useClasses } from "../../model/classes.selector"
import { ClassCard } from "./ClassCard"

export function ClassList() {
    const { classes, isLoading } = useClasses()

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-2xl" />
                ))}
            </div>
        )
    }

    if (classes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-text-secondary">
                <p className="text-lg font-medium">아직 학급이 없어요.</p>
                <p className="text-sm mt-1">학급 만들기 버튼을 눌러 첫 학급을 만들어보세요!</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls, index) => (
                <motion.div
                    key={cls.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <ClassCard cls={cls} />
                </motion.div>
            ))}
        </div>
    )
}
