import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: Auth,
    private router: Router
  ) { };
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  errorM = '';

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const data = {
      username: this.registerForm.value.username!,
      password: this.registerForm.value.password!
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed: ', error);
        if (error.status === 400) {
          this.errorM = 'Username already exists.';
        } else if (error.status === 0) {
          this.errorM = 'Could not connect to the server.';
        } else {
          this.errorM = 'Something went wrong.';
        }
      }
    });
  }
}
