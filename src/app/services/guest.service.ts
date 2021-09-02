import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Guest } from '../models/guest';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormArray, FormGroup } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private authSerive: AuthenticationService,
    private urlService: UrlService
      ) {
        this.baseUrl = this.urlService.getUrl();
      }

  getGuestsName(): Observable<Guest[]> {
    return this.http.get<Guest[]>(`${this.baseUrl}/guest/index`);
  }

  getGuests(): Observable<Guest[]> {
    return this.http.get<Guest[]>(`${this.baseUrl}/guest`);
  }

  getGuestsAsFormArray(): Observable<FormArray> {
    return this.getGuests().pipe(map(
      (guests: Guest[]) => {
        const fgs = guests.map(Guest.asFormGroup);
        return new FormArray(fgs);
      }
    ));
  }

  getGuestsTypeFormArray(guests$: Observable<Guest[]>): Observable<FormArray> {
    return guests$.pipe(map(
      (guests: Guest[]) => {
        const fgs = guests.map(Guest.asFormGroup);
        return new FormArray(fgs);
      }
    ));
  }

  create(guest: Guest) {
    return this.http.post<string>(
      `${this.baseUrl}/guest/create`,
      this.mapGuestToGuestRequest(guest),
      { responseType: 'text' as 'json'});
  }

  update(guest: Guest) {
    return this.http.post<string>(
      `${this.baseUrl}/guest/update`,
      this.mapGuestToGuestRequestWithId(guest),
      { responseType: 'text' as 'json'});
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/guest/${id}`);
  }

  export() {
    // this.http.get(`${this.baseUrl}/guest/export`).subscribe(_ => _)
    window.location.href = `${this.baseUrl}/guest/export?token=${this.authSerive.currentUserValue.token}`;
  }

  private mapGuestToGuestRequest(guest: Guest): any {
    return {
      name: guest.name,
      email: guest.email,
      address: guest.address ? guest.address.id : guest.address,
      gueststate: guest.gueststate ? guest.gueststate.id : guest.gueststate,
    };
  }

  private mapGuestToGuestRequestWithId(guest: Guest): any {
    return {
      id: guest.id,
      name: guest.name,
      email: guest.email,
      address: guest.address ? guest.address.id : guest.address,
      gueststate: guest.gueststate ? guest.gueststate.id : guest.gueststate,
    };
  }
}
