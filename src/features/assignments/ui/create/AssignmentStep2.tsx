export function AssignmentStep2({ formData, setFormData }: any) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
                <label className="block text-sm font-medium text-text-primary mb-2">과제 설명 및 지시사항</label>
                <textarea
                    className="notion-textarea p-2 h-50 resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                />
            </div>
        </div>
    )
}
