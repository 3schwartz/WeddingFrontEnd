import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Wish } from '../models/wish';
import { Observable } from 'rxjs';
import { FormArray } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class WishService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private urlService: UrlService
  ) {
    this.baseUrl = this.urlService.getUrl();
  }

  getWishes(): Observable<Wish[]> {
    return this.http.get<Wish[]>(`${this.baseUrl}/wish`);
  }

  getWishesAsFormArray(): Observable<FormArray> {
    return this.getWishes().pipe(map(
      (wishes: Wish[]) => {
        const fgs = wishes.map(Wish.asFormGroup);
        return new FormArray(fgs);
      }
    ));
  }

  create(wish: Wish) {
    return this.http.post<string>(
      `${this.baseUrl}/wish/create`,
      this.mapWishToWishRequest(wish),
      { responseType: 'text' as 'json'});
  }

  update(wish: Wish) {
    return this.http.post<string>(
      `${this.baseUrl}/wish/update`,
      this.mapWishToWishRequestWithId(wish),
      { responseType: 'text' as 'json'});
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/wish/${id}`);
  }

  private mapWishToWishRequest(wish: Wish): any {
    return {
      name: wish.name,
      url: wish.url,
      price: wish.price,
    };
  }

  private mapWishToWishRequestWithId(wish: Wish): any {
    return {
      id: wish.id,
      name: wish.name,
      url: wish.url,
      price: wish.price,
    };
  }

}
