import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser: User;
  isAdmin: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private adminService: AdminService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
    this.adminService.currentAdmin.subscribe(
      isAdmin => this.isAdmin = isAdmin
    );
  }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.adminService.checkAdmin();
  }
}
