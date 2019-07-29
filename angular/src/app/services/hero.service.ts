import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { Hero } from "./hero";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { MessageService } from './message.service';
// import {ConfigService} from "./config.service";
// import { Config } from "./config";
import { HeroAnswerData } from "../hero-answer-data";
import {ConfigurationService} from "./configuration.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private readonly serviceUrl: string;

  constructor(private http: HttpClient, private messageService: MessageService, private config: ConfigurationService) {
    this.serviceUrl = config.getApiBaseUrl();
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes(offset: number, count: number): Observable<HeroAnswerData> {
    this.messageService.add('HeroService: fetched heroes blu');
    this.messageService.add('serviceUrl: ' + this.serviceUrl);
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Range':  `items=${offset + 1}-${offset + count}`
      })
    };
    this.messageService.add(`${this.serviceUrl}/${this.config.get('charactersEndpoint')}`);
    return this.http.get<HeroAnswerData>(`${this.serviceUrl}/${this.config.get('charactersEndpoint')}`, httpOptions);
  }
}
