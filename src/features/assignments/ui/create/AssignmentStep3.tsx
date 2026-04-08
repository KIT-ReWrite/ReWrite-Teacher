import { Calendar as CalendarIcon } from "lucide-react"

export function AssignmentStep3({ formData, setFormData }: any) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">마감 날짜</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="date"
                            className="notion-input p-2 pl-10"
                            value={formData.dueDate}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    dueDate: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">마감 시간</label>
                    <input
                        type="time"
                        className="notion-input p-2"
                        value={formData.dueTime}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                dueTime: e.target.value,
                            })
                        }
                        required
                    />
                </div>
            </div>
        </div>
    )
}
