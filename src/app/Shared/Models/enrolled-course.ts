export interface EnrolledCourse {
  id:number; 
  courseName: string
  description: string
  rate: number
  instructorName: string
  categoryName: any
  lessons: Lesson[]
}

export interface Lesson {
  title: string
  description: string
  vedioURL: string
  duration: number
  uploadAt: string
  isFree: boolean
  courseId: number
}