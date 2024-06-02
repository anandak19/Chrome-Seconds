import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserDetails } from '../../../../core/models/user-details';
import { UserManagementService } from '../../../../shared/services/userServices/user-management.service';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup;
  formSubmitted?: boolean = false;
  userData!: UserDetails;

  constructor(
    private fb: FormBuilder,
    private _userManagement: UserManagementService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      confirmPassword: [
        '',
        [Validators.required, this.confirmPasswordValidator],
      ],
    });
  }
  ngOnDestroy(): void {
    this.formSubmitted = false;
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
    } else if (!/\d/.test(password)) {
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
    this.formSubmitted = true;
    if (this.signupForm.valid) {
      const { fullName, email, password } = this.signupForm.value;
      this.userData = { fullName, email, password };

      // sending the data to the server
      this._userManagement.createUser(this.userData).subscribe(
        (res) => {
          console.log(res);
          alert('User created succes fully: ' + res.fullName);
          this._router.navigate(['/login']);
        },
        (err) => {
          console.log(err);
          alert(err)
          
        }
      );

      // create all http requests-------------------------

      // reseting the form
      this.formSubmitted = false;
      this.signupForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}
