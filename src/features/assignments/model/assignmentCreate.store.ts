import { useState } from "react"
import type { AssignmentForm } from "./assignmentCreate.type"

export function useAssignmentCreate() {
    const [step, setStep] = useState(1)

    const [formData, setFormData] = useState<AssignmentForm>({
        classId: "",
        title: "",
        description: "",
        dueDate: "",
        dueTime: "23:59",
    })

    const next = () => setStep((s) => Math.min(s + 1, 3))
    const back = () => setStep((s) => Math.max(s - 1, 1))

    return {
        step,
        setStep,
        formData,
        setFormData,
        next,
        back,
    }
}
