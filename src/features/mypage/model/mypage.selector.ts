import { useMeQuery } from "@/entities/auth/queries/auth.queries"

export function useProfile() {
    const { data, isLoading, isError } = useMeQuery()
    return { data, isLoading, isError }
}
