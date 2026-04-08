import { mockClasses } from "@/shared/model/mockData"

export function AssignmentSummary({ formData }: any) {
    return (
        <div className="mt-8 p-5 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-sm font-bold text-text-primary mb-3">과제 요약</h3>

            <ul className="space-y-2 text-sm text-text-secondary">
                <li>
                    <span className="font-medium text-text-primary">학급:</span>{" "}
                    {mockClasses.find((c) => c.id === Number(formData.classId))?.name || "-"}
                </li>

                <li>
                    <span className="font-medium text-text-primary">제목:</span> {formData.title || "-"}
                </li>

                <li>
                    <span className="font-medium text-text-primary">마감:</span> {formData.dueDate} {formData.dueTime}
                </li>
            </ul>
        </div>
    )
}
