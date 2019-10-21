import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private settings: any;

  // constructor(private httpClient: HttpClient) { }
  constructor() { }

  init(): Promise<any> {

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/assets/config.json');

      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          this.settings = JSON.parse(xhr.responseText);
          resolve(this.settings);
        } else if (xhr.readyState === XMLHttpRequest.DONE) {
          reject();
        }
      });

      xhr.send(null);
    });
  }

  get(key: string) {
    return this.settings[key];
  }

  getApiBaseUrl() {
    let back = `${this.get('hostProtocol')}://${this.get('hostApi')}`;

    if (this.get('hostApiPort') !== '') {
      back += `:${this.get('hostApiPort')}`;
    }
    back += this.get('hostBaseUrl');

    return back;
  }

}
