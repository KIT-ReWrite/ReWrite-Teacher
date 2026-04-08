import { mockStudents, mockClasses, mockLearningStats } from "@/shared/model/mockData"

export function useStudents() {
    return mockStudents
}

export function useClassDetail(id: number) {
    return mockClasses.find((c) => c.id === id)
}

export function useStudentDetail(id: number) {
    return mockStudents.find((s) => s.id === id)
}

export function useLearningStats() {
    return mockLearningStats
}
