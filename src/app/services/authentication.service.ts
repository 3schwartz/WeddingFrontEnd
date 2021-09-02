import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { UrlService } from './url.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private baseUrl: string;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private urlService: UrlService
    ) {

    this.baseUrl = this.urlService.getUrl();
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${this.baseUrl}/auth/login`, { username, password })
      .pipe(
        map(res => {
          if (res && res.token) {
            localStorage.setItem('currentUser', JSON.stringify(res));
            this.currentUserSubject.next(res);
          }
          return;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
