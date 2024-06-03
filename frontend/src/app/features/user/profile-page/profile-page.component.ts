import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../../shared/services/userServices/user-management.service';
import { dbUserData } from '../../../core/models/user-details';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  userData!: dbUserData ;

  constructor(private _userManagement: UserManagementService) {}

  ngOnInit(): void {
    this.getCurrentUserData();
  }

  getCurrentUserData() {
    this._userManagement.getUserDetails().subscribe(
      (res) => {
        this.userData = res
        console.log('Response data strored:', this.userData);

      },
      (err) => {
        console.error('Error:', err);
      }
    );
  }
}
