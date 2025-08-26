import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CourseService } from '../../services/course/course-service.service';
import { ICourse } from '../../interfaces/course/icourse';
import { map, catchError, of } from 'rxjs';

export const enrollCourseGuard: CanActivateFn = (route, state) => {
  const courseId = route.paramMap.get('id');
  let courseService = inject(CourseService);
  const router = inject(Router);

  return courseService.getStudentCourses().pipe(
    map((studentCourses: ICourse[]) => {
      const isEnrolled = studentCourses?.some(c => c.id == parseInt(courseId || '0'));

      if (isEnrolled) {
        return true;
      } else {
        router.navigateByUrl('/home');
        return false;
      }
    }),
    catchError((err) => {
      console.error(err);
      router.navigateByUrl('/home');
      return of(false);
    })
  );
};