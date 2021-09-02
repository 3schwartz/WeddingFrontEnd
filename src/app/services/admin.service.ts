import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError, Observable, BehaviorSubject, Subject } from 'rxjs';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl: string;
  private currentAdminSubject: BehaviorSubject<boolean>;
  public currentAdmin: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private urlService: UrlService
  ) {
    this.baseUrl = this.urlService.getUrl();
    this.currentAdminSubject = new BehaviorSubject<boolean>(false);
    this.currentAdmin = this.currentAdminSubject.asObservable();
    this.checkAdmin();
  }

  public checkAdmin() {
    this.http.get(`${this.baseUrl}/checkadmin`).subscribe(admin => {
      this.currentAdminSubject.next(admin['isAdmin'] === 1 ? true : false);
    });
  }

  public async hasUserAdminAuthentication(): Promise<boolean> {
    const isAdmin = await this.http
      .get(`${this.baseUrl}/isadmin`)
      .toPromise()
      .catch(this.handleError);
    return isAdmin['isAdmin'] === 1 ? true : false;
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error.status + ' : ' + (error.error ? error.error.message : error) );
  }

  redirectToAdmin() {
    this.router.navigate(['admin']);
  }
}
