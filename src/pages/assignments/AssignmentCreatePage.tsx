import { useNavigate } from "react-router-dom"
import { PageLayout } from "@/shared/ui/PageLayout"
import { Card } from "@/shared/ui/Card"
import { StepIndicator } from "@/shared/ui/StepIndicator"
import { ArrowLeft } from "lucide-react"

import { useAssignmentCreate } from "@/features/assignments/model/assignmentCreate.store"
import { AssignmentStep1 } from "@/features/assignments/ui/create/AssignmentStep1"
import { AssignmentStep2 } from "@/features/assignments/ui/create/AssignmentStep2"
import { AssignmentStep3 } from "@/features/assignments/ui/create/AssignmentStep3"
import { AssignmentSummary } from "@/features/assignments/ui/create/AssignmentSummary"

function AssignmentCreatePage() {
    const navigate = useNavigate()
    const { step, formData, setFormData, next, back } = useAssignmentCreate()

    const steps = ["기본 정보", "과제 내용", "마감일 설정"]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        alert("과제가 생성되었습니다.")
        navigate("/assignments")
    }

    return (
        <PageLayout>
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6"
                >
                    <ArrowLeft size={18} />
                    돌아가기
                </button>

                <h1 className="text-2xl font-bold text-text-primary mb-8">새 과제 만들기</h1>

                <StepIndicator currentStep={step} steps={steps} />

                <Card className="p-6 sm:p-8 mt-8">
                    <form
                        onSubmit={
                            step === 3
                                ? handleSubmit
                                : (e) => {
                                      e.preventDefault()
                                      next()
                                  }
                        }
                    >
                        {step === 1 && <AssignmentStep1 formData={formData} setFormData={setFormData} />}

                        {step === 2 && <AssignmentStep2 formData={formData} setFormData={setFormData} />}

                        {step === 3 && (
                            <>
                                <AssignmentStep3 formData={formData} setFormData={setFormData} />
                                <AssignmentSummary formData={formData} />
                            </>
                        )}

                        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={back}
                                className={`px-6 py-2.5 rounded-xl border border-gray-200 text-text-secondary ${
                                    step === 1 ? "invisible" : ""
                                }`}
                            >
                                이전
                            </button>

                            <button type="submit" className="px-8 py-2.5 rounded-xl bg-primary text-white">
                                {step === 3 ? "과제 생성하기" : "다음"}
                            </button>
                        </div>
                    </form>
                </Card>
            </div>
        </PageLayout>
    )
}

export default AssignmentCreatePage
