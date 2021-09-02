import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private adminService: AdminService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot) {
    const isAdmin = await this.adminService
    .hasUserAdminAuthentication();
    if (isAdmin) {
      return true;
    }
    // this.router.navigate(['/']).then(
    //   _ => location.reload());
    return false;
  }
}
