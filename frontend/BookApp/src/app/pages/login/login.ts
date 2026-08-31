import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { Login as LoginModel } from '../../models/login';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: Auth,
    private router: Router
  ) { };
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  //för felaktig inloggning t.ex.
  errorM = '';
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const data: LoginModel = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    this.authService.login(data).subscribe({
      next: (response) => {
        console.log("Log in successful");
        localStorage.setItem('token', response.token);
        //this.loginForm.reset();
        this.router.navigate(['/books']);
      },
      error: (error) => {
        console.error('Log in failed: ', error);
        this.errorM = "Wrong username or password";
      }
    });
  }
}
