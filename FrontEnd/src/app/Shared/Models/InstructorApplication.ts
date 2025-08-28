export interface InstructorApplication {
  fullName: string;
  email: string;
  phone: string;
  specialization: string;
  cvUrl: string;
  notes:string;
}

export interface instructorApplicationResponse{
  id: number;
  fullName: string;
  email: string;
  phone: string;
  specialization: string;
  cvUrl: string;
  status: ApplicationStatus;
  appliedAt: string; 
}

export enum ApplicationStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2
}

export interface ReviewDto{
  applicationId:number,
  isApproved:boolean,
  reviewerAdminEmail:string,
  Notes?:string
}