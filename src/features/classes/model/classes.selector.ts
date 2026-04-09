import {
    useClassesQuery,
    useClassDetailQuery,
    useClassAssignmentsQuery,
} from "@/entities/classes/queries/classes.queries"

export function useClasses() {
    const { data, isLoading } = useClassesQuery()
    return { classes: data ?? [], isLoading }
}

export function useClassDetail(id: number) {
    const { data, isLoading } = useClassDetailQuery(id)
    return { cls: data, isLoading }
}

export function useAssignments(classId: number) {
    const { data, isLoading } = useClassAssignmentsQuery(classId)
    return { assignments: data ?? [], isLoading }
}
