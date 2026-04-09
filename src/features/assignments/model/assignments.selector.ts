import { useAssignmentsQuery } from "@/entities/assignments/queries/assignments.queries"

export function useFilteredAssignments(classId?: number) {
    const { data, isLoading } = useAssignmentsQuery(classId === undefined ? undefined : classId)
    return {
        assignments: data ?? [],
        isLoading,
    }
}
