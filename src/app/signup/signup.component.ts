import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService,private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      console.log(formData);
      // Handle form submission
      this.userService.signup(formData).subscribe(response => {
        // Handle the response
        console.log('Signup successful', response);
      }, error => {
        // Handle the error
        console.error('Signup failed', error);
      });
    }
  }
  get f() {
    return this.signupForm.controls;
  }
  redirectToLogin(){
    this.router.navigate(['/login']);
  }
}
