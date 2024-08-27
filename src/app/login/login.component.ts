import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  showSnackbar: boolean = false;
  snackbarMessage: string = '';
  constructor(private fb: FormBuilder, private userService: UserService,private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log(loginData);
      this.userService.login(loginData).subscribe(response => {
        this.router.navigate(['/user-list']);
        console.log('Login successful', response);
      }, error => {
        this.snackbarMessage = 'Invalid username or password';
        this.showSnackbar = true;
        setTimeout(() => this.showSnackbar = false, 3000);
        console.error('Login failed', error);
      });
    }
  }
  get f() {
    return this.loginForm.controls;
  }
  redirectToSignup(): void {
    this.router.navigate(['/signup']); // Navigate to signup page
  }
}
