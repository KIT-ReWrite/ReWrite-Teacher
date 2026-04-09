import { useClassesQuery } from "@/entities/classes/queries/classes.queries"

interface Props {
    selectedClass: string
    onChange: (value: string) => void
}

export function AssignmentsFilter({ selectedClass, onChange }: Props) {
    const { data: classes, isLoading } = useClassesQuery()

    return (
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <select
                className="notion-input p-2 max-w-48 w-full sm:w-64 bg-white"
                value={selectedClass}
                onChange={(e) => onChange(e.target.value)}
                disabled={isLoading}
            >
                <option value="all">모든 학급 보기</option>
                {classes?.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>
        </div>
    )
}
