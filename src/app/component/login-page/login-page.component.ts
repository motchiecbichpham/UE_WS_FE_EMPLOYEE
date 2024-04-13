import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { NotificationService } from '../../service/notification.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
  ngOnInit(): void {
    localStorage.setItem('c_token', '');
    localStorage.setItem('candidateProfile', '');
  }

  loginForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notiService: NotificationService
  ) {}
  submit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.login();
  }
  @Input() error: string | null | undefined;

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        localStorage.setItem('c_token', response.token);
        localStorage.setItem(
          'candidateProfile',
          JSON.stringify(response.candidate)
        );
        this.router.navigate(['/home']);
      },
      (error) => {
        this.notiService.showNotification('Load jobs failed', 'Close', false);
      }
    );
  }
}
