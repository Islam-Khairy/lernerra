import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instructor-profile',
  imports: [SelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css'],
  standalone: true
})
export class InstructorProfileComponent implements OnInit {
  instructor = {
    firstName: 'john',
    lastName: 'doe',
    email: 'john@gmail.com',
    phone: '01012205020',
    specialization: 'design', 
  };

  specializations = [
    { name: 'Design', value: 'design' },
    { name: 'Programming', value: 'programming' },
    { name: 'Marketing', value: 'marketing' },
    { name: 'Data Science', value: 'data-science' },
  ];

  profileForm!: FormGroup;
  selectedFile: File | null = null;
  initialInstructorData: any; 


  constructor(private fb: FormBuilder) {}

  

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstName: [this.instructor.firstName, Validators.required],
      lastName: [this.instructor.lastName, Validators.required],
      email: [this.instructor.email, [Validators.required, Validators.email]],
      phone: [this.instructor.phone, Validators.required],
      specialization: [this.instructor.specialization, Validators.required],
      cv: [null]
    });
     this.initialInstructorData = { ...this.instructor };

  this.profileForm.valueChanges.subscribe(() => {
    this.checkIfChanged();
  });
  }

 isActuallyChanged = false;

checkIfChanged() {
  const formValue = { ...this.profileForm.value };
  delete formValue.cv;

  this.isActuallyChanged =
    Object.keys(formValue).some(
      key => formValue[key] !== this.initialInstructorData[key]
    ) || !!this.selectedFile;
}

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file.');
      return;
    }
    this.selectedFile = file;
    this.profileForm.get('cv')?.setValue(file);

    this.checkIfChanged();
  }
}

  onSubmit() {
    if (this.profileForm.valid && this.profileForm.dirty) {
      console.log(this.profileForm.value);
    }
  }
}