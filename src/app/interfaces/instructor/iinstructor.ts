export interface IInstructor {
    id: string
    email: string
    fullName: string
    phoneNumber: string
    imageUrl: string
    instructorApplication?: InstructorApplication
}

export interface InstructorApplication {
    id: number
    fullName: string
    email: string
    phone: string
    specialization?: string
    cvUrl: string
    status: number
    appliedAt: string
}
