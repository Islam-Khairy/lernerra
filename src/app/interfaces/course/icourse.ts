export interface ICourse {
  id: number
  name: string
  description: string
  rate: number
  price: number
  categoryName: string
  status: string
  imageUrl: string
  instructor: Instructor
  lessons: Lesson[]
  enrollments: Enrollment[]
  duration?:number
  notes?: string
  categoryId?:number
  isFree?: boolean
}

export interface Lesson {
  id: number
  title: string
  description: string
  vedioURL: string
  duration: number
  uploadAt: string
  isFree: boolean
}

export interface Instructor {
  id: string
  email: string
  fullName: string
  phoneNumber: string
  imageUrl: string
  instructorApplication: InstructorApplication
}

export interface Enrollment {
  studentName: string
  studentEmail: string
  enrollAt: string
  progress: number
}

export interface InstructorApplication {
  id: number
  fullName: string
  email: string
  phone: string
  specialization: string
  cvUrl: string
  status: number
  appliedAt: string
}

