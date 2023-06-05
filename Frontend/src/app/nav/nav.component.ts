import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/user.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(
    public userService: AuthService) {
  }

  logout(): void {
    this.userService.doLogout();
  }
}
