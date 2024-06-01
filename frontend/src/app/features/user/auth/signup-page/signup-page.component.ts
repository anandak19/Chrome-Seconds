import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent implements OnInit, OnDestroy{

  signupForm!: FormGroup;
  formSubmitted?: boolean = false

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator]]
    });
  }
  ngOnDestroy(): void {
    this.formSubmitted = false
  }

    // validating password type
    passwordValidator(
      control: AbstractControl
    ): { [key: string]: boolean } | null {
      const password = control.root.get('password')?.value;
      if (!password || password.length < 5) {
        return { tooShort: true };
      } else if (!/[A-Z]/.test(password)) {
        return { noUppercase: true };
      } else if (!/[a-z]/.test(password)) {
        return { noLowercase: true };
      }else if (!/\d/.test(password)) {
        return { noNumber: true };
      }
      return null;
    }

    // validating both passwords 
    confirmPasswordValidator(
      control: AbstractControl
    ): { [key: string]: boolean } | null {
      const password = control.root.get('password');
      return password && control.value !== password.value
        ? { misMatch: true }
        : null;
    }

  onSubmit() {
    console.log("Submitted");
    
    this.formSubmitted = true
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      // Handle form submission, e.g., send the data to the server
    } else {
      console.log('Form is invalid');
    }
  }

}
