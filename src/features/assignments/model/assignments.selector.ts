import { mockAssignments } from "@/shared/model/mockData"

export function getFilteredAssignments(selectedClass: string) {
    if (selectedClass === "all") return mockAssignments

    return mockAssignments.filter((a) => a.class_id === Number(selectedClass))
}
