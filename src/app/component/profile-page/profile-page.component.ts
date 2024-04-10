import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Candidate } from '../../type/candidate';
import { AuthService } from '../../service/auth.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  profileForm: FormGroup = this.fb.group({
    id: [null],
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dob: ['', Validators.required],
    introduction: [''],
    phone: [''],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notiService: NotificationService
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }
  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }
    this.updateProfile();
  }

  resetForm() {
    const candidate = localStorage.getItem('candidateProfile');
    const profileCandidate: Candidate = candidate
      ? JSON.parse(candidate)
      : null;

    this.setFormValues(profileCandidate);
  }
  setFormValues(candidate: Candidate) {
    this.profileForm.setValue(candidate);
  }
  updateProfile() {
    this.authService.updateProfile(this.profileForm.value).subscribe(
      (response) => {
        this.notiService.showNotification(
          'Profile updated successfully',
          'Close'
        );
        localStorage.setItem('candidateProfile', JSON.stringify(response));
      },
      (error) => {
        this.notiService.showNotification('Update failed', 'Close');
      }
    );
  }
}
