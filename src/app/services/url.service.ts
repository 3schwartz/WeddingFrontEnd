import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private localUrl = 'http://localhost:8000';
  private devUrl = '/backend';

  constructor() { }

  getUrl(): string {
    return this.devUrl;
    // return this.localUrl;
  }
}
