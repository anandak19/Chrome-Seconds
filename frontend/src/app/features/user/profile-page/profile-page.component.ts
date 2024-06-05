import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserManagementService } from '../../../shared/services/userServices/user-management.service';
import { dbUserData, updatedUser } from '../../../core/models/user-details';
import { error, profile } from 'node:console';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  userData!: dbUserData;
  updatedUser!: updatedUser
  profileForm!: FormGroup;
  public data!: dbUserData;
  isUpdating: boolean = false;
  userprofileImage!: string | null;

  @ViewChild('userImage') userImage!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private _userManagement: UserManagementService,
    private _fb: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit() {
    // inint the reactive form with empty values
    this.profileForm = this._fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13),
        ],
      ],
      address: ['', [Validators.required]],
      pincode: [
        '',
        [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
      ],
    });

    // get user data from backend and store in the userData variable
    this._userManagement.getUserDetails().subscribe(
      (res) => {
        this.userData = res;
        this.userprofileImage = this.userData.profileImage;
        this.patchFormValues(this.userData);

        console.log('Response data strored:', this.userData);
      },
      (err) => {
        console.error('Error:', err);
      }
    );
  }

  patchFormValues(user: dbUserData) {
    this.profileForm.patchValue({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      pincode: user.pincode,
    });
  }

  // to save and show the profile image
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.userprofileImage = e.target.result;
      // send http post reqest to save the image string to db
      this._userManagement.updateUserImage(this.userprofileImage).subscribe(
        (res) => {
          console.log(res);
          // pay load too large error is getting  -------------------------------------fix it now
        },
        (err) => {
          console.error(err);
        }
      );
    };
    reader.readAsDataURL(file);
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  // when user clicked on submit button
  onSubmit() {
    if (this.isUpdating) {
      if (this.profileForm.valid) {
        console.log(this.profileForm.value);
        // http post to save the updated data to db
        this.updatedUser = this.profileForm.value
        this._userManagement.updateUserDetails(this.updatedUser).subscribe(
          (res) => {
            console.log(res);
          },(err) => {
            console.log(err);
          }
        )
        //bring the change into the profile card data also     reload if needed
      } else {
        alert('Enter all details save');
      }
    } else {
      this.isUpdating = !this.isUpdating;
    }
  }

  logout(){
    this._userManagement.logoutUser();
    this._router.navigate(['']);
  }
}


