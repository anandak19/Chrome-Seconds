import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserManagementService } from '../../services/userServices/user-management.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  public userImage! : string
  isLoggedIn: boolean = false;
  

  constructor(private _usermanagement: UserManagementService) {}


  ngOnInit(): void {
    // get user image and show it 
    this._usermanagement.currentUserImage.subscribe( image => {
      this.userImage = image
    })

    // check if user is login 
    this._usermanagement.isLoggedIn.subscribe(status => {
      this.isLoggedIn = status;
    });
    
  }

  onClick(){
    console.log("hi");
    
  }
}
