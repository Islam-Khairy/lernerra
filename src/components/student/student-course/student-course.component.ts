
import { Component, effect, signal } from '@angular/core';
import { Lesson } from '../../../app/Shared/Models/enrolled-course';
import { CourseService } from '../../../app/services/course/course-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ICourse } from '../../../app/interfaces/course/icourse';
import { NgClass } from '@angular/common';
import { CoursePrograssService } from '../../../app/core/services/courseService/course-prograss.service';
import { AccountService } from '../../../app/core/services/account.service';
import { FormsModule } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-student-course',
  imports: [NgClass, FormsModule, RouterLink],
  templateUrl: './student-course.component.html',
  styleUrl: './student-course.component.css',
})
export class StudentCourseComponent {
  lessons=signal<Lesson[]>([])
  course=signal<ICourse| null>(null)
  courseId=signal<string>("0")
  rating!:number
  videoUrl=signal<string>("")
  userId: string = "";
  progress = 0;
  isChecked = signal<boolean>(false);
  constructor(private route:ActivatedRoute,private courseService:CourseService,private courseProgressService:CoursePrograssService,private accountService:AccountService,private toastr:ToastrService) {
    this.userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    effect(() => {
      console.log(this.courseId());
      this.getCourseLessons();
    });
  }
  ngOnInit(): void {
    
         this.route.paramMap.subscribe((params)=>{
      this.courseId.set(params.get('id') || "0");
      this.userId = this.accountService.user()?.userId|| "";
          this.getCourseLessons();
          this.getCourseProgress();
    })
    
  }


  getCourseLessons() {
    this.courseService.getCourseById(parseInt(this.courseId())).subscribe({
      next: (res) => {
        console.log(res.data);
        this.course.set(res.data);
        this.videoUrl.set(this.course()?.lessons[0]?.vedioURL || '');
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  chooseVideo(lessonUrl: string) {
  this.videoUrl.set(lessonUrl);
  const videoEl = document.querySelector('video');
  videoEl?.load();
}

calcDuration(duration: number): number {
  return Math.floor((duration / 60));
}

markLessonAsCompleted(lessonId: number) {
  this.courseProgressService.markLessonAsCompleted(lessonId, this.userId).subscribe({
    next: (res) => {
      console.log('Lesson marked as completed:', res);
      this.isChecked.set(true);
      // Optionally, refresh the lessons or update the UI
    },
    error: (err) => {
      console.error('Error marking lesson as completed:', err);
    }
  });
}
getCourseProgress() {
    console.log(this.courseId());
    this.courseProgressService.getCoursePrograss(parseInt(this.courseId())).subscribe({
      next: (res) => {
        console.log(res);
        this.progress = Math.round(res.progressPercentage);
        console.log(this.progress);
      },
    });
  }

  addRating(){
    this.courseService.addRating(parseInt(this.courseId()),this.rating).subscribe({
      next:(res)=>{
        console.log(res);
        this.toastr.success(res,"Success",{
          progressBar:true,
          progressAnimation:"increasing",
          closeButton:true
        })
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error(err.error ,"Error",{
          progressBar:true,
          progressAnimation:"increasing",
          closeButton:true
        })
      }
    })
  }

}