import { Injectable } from '@angular/core';
import { Address } from '../models/address';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private urlService: UrlService
  ) { 
    this.baseUrl = this.urlService.getUrl();
  }

  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.baseUrl}/address`);
  }

  readAddress(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.baseUrl}/address/${id}`);
  }

  update(address: Address) {
    return this.http.post<string>(
      `${this.baseUrl}/address/update`,
      this.mapAddressToAddressRequestWithId(address),
      { responseType: 'text' as 'json'});
  }

  create(address: Address) {
    return this.http.post<string>(
      `${this.baseUrl}/address/create`,
      this.mapAddressToAddressRequest(address),
      { responseType: 'text' as 'json'});
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/address/${id}`);
  }

  mapAddressToAddressRequest(address: Address): any {
    return {
      homeAddress: address.homeAddress,
      guests: address.guests.map(guest => {
        return {
          id: guest.id
        };
      }),
    };
  }

  mapAddressToAddressRequestWithId(address: Address): any {
    return {
      id: address.id,
      homeAddress: address.homeAddress,
      guests: address.guests.map(guest => {
        return {
          id: guest.id
        };
      }),
    };
  }
}
