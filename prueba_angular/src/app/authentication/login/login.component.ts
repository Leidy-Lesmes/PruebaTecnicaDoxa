import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule

  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = null;

      this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/products']); 
          },
          error: () => {
            this.loading = false;
            this.errorMessage = 'Usuario o contraseña incorrectos';
          }
        });
    }
  }
}