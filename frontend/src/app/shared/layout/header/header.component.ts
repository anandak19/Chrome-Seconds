import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserManagementService } from '../../services/userServices/user-management.service';
import { AppConfig } from '../../../../config/app-config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  public userImage! : string
  public isToggleNav : boolean = false

  constructor(private _usermanagement: UserManagementService) {}

  ngOnInit(): void {
    // get user image and show it 
    this._usermanagement.currentUserImage.subscribe( image => {
      if (image) {
        this.userImage = image
      } else {
        this.userImage = AppConfig.defaultUserUrl
      }
    })
  }

  onMoreClick(): void {
    this.isToggleNav = ! this.isToggleNav
  }
}
