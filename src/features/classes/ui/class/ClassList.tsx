import { motion } from "framer-motion"
import { useClasses } from "../../model/classes.selector"
import { ClassCard } from "./ClassCard"

export function ClassList() {
    const classes = useClasses()

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
