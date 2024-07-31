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
import { UserValidationService } from '../../../../shared/services/validations/user-validation.service';
import { AosService } from '../../../../shared/services/aosService/aos.service';

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
    private _router: Router,
    private _userValidation: UserValidationService,
    private _aosService: AosService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
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
      password: ['', [Validators.required, this._userValidation.passwordValidator]],
      confirmPassword: [
        '',
        [Validators.required, this._userValidation.confirmPasswordValidator],
      ],
    });
  }
  ngOnDestroy(): void {
    this.formSubmitted = false;
  }
  ngAfterViewInit(): void {
    this._aosService.refresh();
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
