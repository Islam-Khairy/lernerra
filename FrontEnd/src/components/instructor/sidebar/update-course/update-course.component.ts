import { Component, inject } from '@angular/core';
import { SelectModule } from 'primeng/select';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorService } from './../../../../app/services/instructor/instructor-service.service';
import { CourseService } from '../../../../app/services/course/course-service.service';
import { AccountService } from '../../../../app/core/services/account.service';
import { CloudinaryUploadService } from '../../../../app/services/images/cloudinary-upload-service.service';
import { ToastrService } from 'ngx-toastr';
import { ICourse } from '../../../../app/interfaces/course/icourse';
import { ILesson } from '../../../../app/interfaces/lesson/ilesson';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CategoryService } from '../../../../app/core/services/category.service';
import { LessonService } from '../../../../app/services/lesson/lesson-service.service';

@Component({
  selector: 'app-update-course',
  imports: [
    ReactiveFormsModule,
    DialogModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
    SelectModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css',
})
export class UpdateCourseComponent {
  categories: any;
  selectedLevel: string = '';
  levels = [
    { name: 'Beginner', value: 'beginner' },
    { name: 'Intermediate', value: 'intermediate' },
    { name: 'Advanced', value: 'advanced' },
    { name: 'Expert', value: 'expert' },
  ];
  courseId!: number;
  course!: ICourse;
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  courseImageUrl!: string;
  lessonForm: FormGroup;
  lessonId!: number;
  lessons!: ILesson[];
  showLessonModal = false;
  editingLesson: any = null;

  selectedVideo: File | null = null;
  videoPreview: string | null = null;
  isuploading: boolean = false;
  CourseForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    currency: new FormControl(''),
    imageUrl: new FormControl('', [Validators.required]),
    instructorId: new FormControl(''),
    categoryId: new FormControl('', [Validators.required]),
  });

  private lessonVideos = new Map<
    number,
    {
      file: File | null;
      preview: string | null;
      fileName: string | null;
    }
  >();
  categoryService = inject(CategoryService);
  lessonService = inject(LessonService);
  router = inject(Router);
  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private accountService: AccountService,
    private cloudService: CloudinaryUploadService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private instructorService: InstructorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.lessonForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(40)]],
      VedioURL: ['', [Validators.required]],
      duration: [0, [Validators.required, Validators.min(60)]],
      courseId: [''],
    });
  }

  private resetVideoSelection() {
    this.selectedVideo = null;
    if (this.videoPreview) {
      URL.revokeObjectURL(this.videoPreview);
      this.videoPreview = null;
    }
  }

  getVideoDuration(url: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.crossOrigin = 'anonymous';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(url); // clean up preview URL
        resolve(video.duration); // duration in seconds
      };

      video.onerror = () => {
        reject('Error loading video metadata.');
      };

      video.src = url;
    });
  }

  onVideoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Clean up preview URL
      if (this.videoPreview) {
        URL.revokeObjectURL(this.videoPreview);
      }

      this.selectedVideo = file;
      this.videoPreview = URL.createObjectURL(file);

      // ⬇️ استخراج مدة الفيديو أولاً
      this.getVideoDuration(this.videoPreview)
        .then((duration) => {
          console.log('Video duration (seconds):', duration);

          // اختياري: تخزين المدة في الفورم
          this.lessonForm.patchValue({ duration: Math.floor(duration) });

          // ⬇️ رفع الفيديو بعد استخراج المدة
          this.uploadVideoFile(file);
        })
        .catch((err) => {
          console.error('Failed to get video duration:', err);
          this.toastr.error("Couldn't read video duration");
        });
    }
  }

  uploadVideoFile(file: File) {
    console.log('Video selected:', file.name);
    this.isuploading = true;
    this.cloudService.uploadVideo(file).subscribe({
      next: (res: any) => {
        const cloudinaryUrl = res.secure_url;
        this.isuploading = false;
        this.lessonForm.patchValue({ VedioURL: cloudinaryUrl });
        this.toastr.success('Video uploaded successfully');
        console.log('Video URL from Cloudinary:', cloudinaryUrl);
      },
      error: (err) => {
        this.isuploading = false;
        console.error(err);
        this.toastr.error('Video upload failed');
      },
    });
  }

  removeVideo() {
    if (this.videoPreview) {
      URL.revokeObjectURL(this.videoPreview);
    }
    this.selectedVideo = null;
    this.videoPreview = null;

    this.lessonForm.patchValue({ VedioURL: '' });

    if (this.editingLesson) {
      this.lessonVideos.delete(this.editingLesson.id);
    }
  }

  openAddLessonModal() {
    this.editingLesson = null;
    this.lessonForm.reset({ duration: 0 });
    this.resetVideoSelection();
    this.showLessonModal = true;
  }

  editLesson(lesson: any) {
    this.editingLesson = lesson;
    this.lessonForm.patchValue(lesson);
    this.lessonId = lesson.id;
    console.log(lesson.id);
    this.videoPreview = lesson.vedioURL;
    this.lessonForm.patchValue({
      VedioURL: lesson.vedioURL,
      courseId: this.courseId,
      duration: lesson.duration,
    });
    this.showLessonModal = true;
  }

  closeLessonModal() {
    this.showLessonModal = false;
    this.lessonForm.reset();
    this.editingLesson = null;

    this.selectedVideo = null;
    this.videoPreview = null;
  }

  confirmDelete(event: Event, lessonId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this lesson?',
      header: 'Delete Lesson',
      icon: 'pi pi-times-circle !text-red-500',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text p-button-secondary',
      accept: () => {
        this.deleteLesson(lessonId);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Lesson deleted successfully',
        });
      },
    });
  }

  deleteLesson(lessonId: number) {
    this.lessonService.deleteLesson(lessonId).subscribe({
      next: (res) => {
        console.log(res);
        this.getLessons();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getVideoInfo(lessonId: number): string {
    const lessonVideo = this.lessonVideos.get(lessonId);
    if (lessonVideo && lessonVideo.fileName) {
      return lessonVideo.fileName;
    }

    const lesson = this.lessons.find((l) => l.id === lessonId);
    if (lesson && lesson.vedioURL) {
      return 'Video attached';
    }

    return 'No video';
  }

  onCourseImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedImage = file;

      // ⬇️ Show preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);

      // ⬇️ Upload to server/cloud
      this.cloudService.uploadImage(file).subscribe({
        next: (res: any) => {
          console.log(res.secure_url);
          this.toastr.success('Image is uploaded successfully');
          this.courseImageUrl = res.secure_url;

          this.CourseForm.patchValue({
            imageUrl: res.secure_url,
          });
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Image upload failed');
        },
      });
    }
  }

  removeImage(): void {
    this.selectedImage = null;
    this.imagePreview = null;

    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }

    // Clear image URL from form & cloud URL if needed
    this.courseImageUrl = '';
    this.CourseForm.patchValue({
      imageUrl: '',
    });
  }

  ngOnDestroy() {
    this.lessonVideos.forEach((video) => {
      if (video.preview) {
        URL.revokeObjectURL(video.preview);
      }
    });
    this.lessonVideos.clear();

    if (this.videoPreview) {
      URL.revokeObjectURL(this.videoPreview);
    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categories = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseId = parseInt(params.get('id') || '0', 0);
    });
    this.getCategories();
    this.getCourseDetails();
    console.log(this.course);
    this.getLessons();
  }

  getCourseDetails() {
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (res) => {
        console.log(res);
        this.course = res.data;
        this.CourseForm.patchValue({
          name: this.course.name,
          description: this.course.description,
          price: this.course.price,
          currency: 'USD',
          imageUrl: this.course.imageUrl,
          instructorId: this.course.instructor.id,
          categoryId: this.course.categoryId,
        });
        this.courseImageUrl = this.course.imageUrl;
        this.imagePreview = this.course.imageUrl;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateCourse() {
    if (this.CourseForm.invalid) {
      this.CourseForm.markAllAsTouched();
      return;
    }
    this.CourseForm.patchValue({
      instructorId:
        'daa4a973-1fc1-49cc-bb25-3f2a5b9b888a' /*this.accountService.user()?.userId*/,
      currency: 'USD',
      imageUrl: this.courseImageUrl,
    });
    this.instructorService
      .updateCourse(this.courseId, this.CourseForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success('Course is updated successfully', 'Success', {
            progressBar: true,
            progressAnimation: 'increasing',
            closeButton: true,
          });
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err.error.message, 'Error', {
            progressBar: true,
            progressAnimation: 'decreasing',
            closeButton: true,
          });
        },
      });
  }

  uploadLesson() {
    console.log(this.lessonForm.value);
    this.lessonForm.patchValue({
      courseId: this.courseId,
    });
    if (this.lessonForm.invalid) {
      this.lessonForm.markAllAsTouched();
      return;
    }
    this.lessonService.uploadLesson(this.lessonForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.getLessons();
        this.toastr.success('Lesson is uploaded successfully', 'Success', {
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: true,
        });
        this.closeLessonModal();
        this.lessonForm.reset();
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.message, 'Error', {
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,
        });
      },
    });
  }

  getLessons() {
    this.lessonService.getLessons(this.courseId).subscribe({
      next: (res) => {
        console.log(res);
        this.lessons = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleLesson() {
    if (this.editingLesson) {
      this.updateLesson();
    } else {
      this.uploadLesson();
    }
  }

  updateLesson() {
    console.log(this.lessonForm.value);
    console.log(this.lessonId);

    if (this.lessonForm.invalid) {
      this.lessonForm.markAllAsTouched();
      return;
    }
    this.lessonService
      .updateLesson(this.lessonId, this.lessonForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getLessons();
          this.toastr.success('Lesson is updated successfully', 'Success', {
            progressBar: true,
            progressAnimation: 'increasing',
            closeButton: true,
          });
          this.closeLessonModal();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err.error.message, 'Error', {
            progressBar: true,
            progressAnimation: 'decreasing',
            closeButton: true,
          });
        },
      });
  }
}
