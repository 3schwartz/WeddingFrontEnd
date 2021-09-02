import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';
import { GuestState } from '../models/guest-state';

@Injectable({
  providedIn: 'root'
})
export class GuestStateService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private urlService: UrlService
  ) {
    this.baseUrl = this.urlService.getUrl();
  }

  getGuestStates(): Observable<GuestState[]> {
    return this.http.get<GuestState[]>(`${this.baseUrl}/gueststate`);
  }
}
