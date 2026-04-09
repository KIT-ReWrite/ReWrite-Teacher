import { useSubmissionsQuery } from "@/entities/submissions/queries/submissions.queries"

export function useSubmissions(assignmentId: number, status?: string) {
    const { data, isLoading } = useSubmissionsQuery(assignmentId, status)
    return {
        submissions: data ?? [],
        isLoading,
    }
}
