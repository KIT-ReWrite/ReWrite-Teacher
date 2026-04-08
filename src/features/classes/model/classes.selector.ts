import { mockClasses, mockAssignments } from "@/shared/model/mockData"
import { useState } from "react"

export function useClasses() {
    return mockClasses
}

export function useClassDetail(id: number) {
    return mockClasses.find((c) => c.id === id)
}

export function useAssignments(classId: number) {
    return mockAssignments.filter((a) => a.class_id === classId)
}

export function useCopyCode() {
    const [copiedCode, setCopiedCode] = useState<string | null>(null)

    const copy = (code: string) => {
        navigator.clipboard.writeText(code)
        setCopiedCode(code)
        setTimeout(() => setCopiedCode(null), 2000)
    }

    return { copiedCode, copy }
}
