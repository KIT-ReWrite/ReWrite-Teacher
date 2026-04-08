import { mockClasses } from "@/shared/model/mockData"

export function AssignmentStep1({ formData, setFormData }: any) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
                <label className="block text-sm font-medium text-text-primary mb-2">대상 학급</label>
                <select
                    className="notion-input appearance-none p-2"
                    value={formData.classId}
                    onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                    required
                >
                    <option value="">학급을 선택하세요</option>
                    {mockClasses.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-text-primary mb-2">과제 제목</label>
                <input
                    type="text"
                    className="notion-input p-2"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
            </div>
        </div>
    )
}
