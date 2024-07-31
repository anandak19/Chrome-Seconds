import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserLogin } from '../../../../core/models/user-details';
import { UserManagementService } from '../../../../shared/services/userServices/user-management.service';
import { AosService } from '../../../../shared/services/aosService/aos.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit, OnDestroy {
  private userData!: UserLogin;

  loginForm!: FormGroup;
  formSubmitted?: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _userManagement: UserManagementService,
    private _router: Router,
    private _aosService: AosService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  ngOnDestroy(): void {
    this.formSubmitted = false;
  }

  ngAfterViewInit(): void {
    this._aosService.refresh();
  }

  onSubmit() {
    console.log('Submitted');

    this.formSubmitted = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const { email, password } = this.loginForm.value;
      this.userData = { email, password };
      // send the data to the server
      this._userManagement.loginUser(this.userData).subscribe(
        (res) => {
          console.log(res);
          this._router.navigate([''])
        },
        (err) => {
          console.log(err);
          alert(err);
        }
      );

      // reset the form and related data 
      this.formSubmitted = false;
      this.loginForm.reset();      
    } else {
      console.log('Form is invalid');
    }
  }
}
