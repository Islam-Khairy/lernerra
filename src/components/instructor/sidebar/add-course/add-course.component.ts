import { Component } from '@angular/core';
import { SelectModule } from 'primeng/select';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-course',
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
    RouterLink,
  ],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
})
export class AddCourseComponent {
  selectedLevel: string = '';
  levels = [
    { name: 'Beginner', value: 'beginner' },
    { name: 'Intermediate', value: 'intermediate' },
    { name: 'Advanced', value: 'advanced' },
    { name: 'Expert', value: 'expert' },
  ];

  selectedImage: File | null = null;
  imagePreview: string | null = null;

  lessonForm: FormGroup;

  lessons: any[] = [];
  showLessonModal = false;
  editingLesson: any = null;

  selectedVideo: File | null = null;
  videoPreview: string | null = null;

  private lessonVideos = new Map<
    number,
    {
      file: File | null;
      preview: string | null;
      fileName: string | null;
    }
  >();

  constructor(private fb: FormBuilder) {
    this.lessonForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      videoURL: [''],
      duration: [0, [Validators.required, Validators.min(1)]],
      isFree: [false],
    });
  }

  private resetVideoSelection() {
    this.selectedVideo = null;
    if (this.videoPreview) {
      URL.revokeObjectURL(this.videoPreview);
      this.videoPreview = null;
    }
  }

  onVideoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (this.videoPreview) {
        URL.revokeObjectURL(this.videoPreview);
      }

      this.selectedVideo = file;
      this.videoPreview = URL.createObjectURL(file);

      this.uploadVideoFile(file);
    }
  }

  uploadVideoFile(file: File) {
    console.log('Video selected:', file.name);
    this.lessonForm.patchValue({ videoURL: this.videoPreview });
  }

  removeVideo() {
    if (this.videoPreview) {
      URL.revokeObjectURL(this.videoPreview);
    }
    this.selectedVideo = null;
    this.videoPreview = null;

    this.lessonForm.patchValue({ videoURL: '' });

    if (this.editingLesson) {
      this.lessonVideos.delete(this.editingLesson.id);
    }
  }

  openAddLessonModal() {
    this.editingLesson = null;
    this.lessonForm.reset({ isFree: false, duration: 0 });
    this.resetVideoSelection();
    this.showLessonModal = true;
  }

  editLesson(lesson: any) {
    this.editingLesson = lesson;
    this.lessonForm.patchValue(lesson);

    this.resetVideoSelection();

    const lessonVideo = this.lessonVideos.get(lesson.id);
    if (lessonVideo && lessonVideo.file && lessonVideo.preview) {
      this.selectedVideo = lessonVideo.file;
      this.videoPreview = lessonVideo.preview;
      this.lessonForm.patchValue({ videoURL: this.videoPreview });
    } else if (lesson.videoURL) {
      this.lessonForm.patchValue({ videoURL: lesson.videoURL });
    }

    this.showLessonModal = true;
  }

  closeLessonModal() {
    this.showLessonModal = false;
    this.lessonForm.reset();
    this.editingLesson = null;

    this.selectedVideo = null;
    this.videoPreview = null;
  }

  onSubmitLesson() {
    if (this.lessonForm.valid) {
      const lessonData = { ...this.lessonForm.value };

      if (this.editingLesson) {
        const index = this.lessons.findIndex(
          (l) => l.id === this.editingLesson.id
        );
        this.lessons[index] = { ...this.editingLesson, ...lessonData };

        if (this.selectedVideo && this.videoPreview) {
          this.lessonVideos.set(this.editingLesson.id, {
            file: this.selectedVideo,
            preview: this.videoPreview,
            fileName: this.selectedVideo.name,
          });
        } else if (!lessonData.videoURL) {
          this.lessonVideos.delete(this.editingLesson.id);
        }
      } else {
        const newLesson = {
          id: Date.now(),
          ...lessonData,
        };
        this.lessons.push(newLesson);

        if (this.selectedVideo && this.videoPreview) {
          this.lessonVideos.set(newLesson.id, {
            file: this.selectedVideo,
            preview: this.videoPreview,
            fileName: this.selectedVideo.name,
          });
        }
      }

      this.closeLessonModal();
    }
  }

  deleteLesson(lessonId: number) {
    this.lessons = this.lessons.filter((l) => l.id !== lessonId);

    const lessonVideo = this.lessonVideos.get(lessonId);
    if (lessonVideo && lessonVideo.preview) {
      URL.revokeObjectURL(lessonVideo.preview);
    }
    this.lessonVideos.delete(lessonId);
  }

  getVideoInfo(lessonId: number): string {
    const lessonVideo = this.lessonVideos.get(lessonId);
    if (lessonVideo && lessonVideo.fileName) {
      return lessonVideo.fileName;
    }

    const lesson = this.lessons.find((l) => l.id === lessonId);
    if (lesson && lesson.videoURL) {
      return 'Video attached';
    }

    return 'No video';
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  removeImage(): void {
    this.selectedImage = null;
    this.imagePreview = null;
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
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
}
