export function StudentProfile({ student }: any) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-primary-light text-primary flex items-center justify-center text-2xl font-bold">
                {student.name.charAt(0)}
            </div>

            <div>
                <h1 className="text-2xl font-bold text-text-primary">{student.name}</h1>
                <p className="text-text-secondary">{student.student_number}</p>
            </div>
        </div>
    )
}
