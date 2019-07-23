import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable} from "rxjs";
import {HeroAnswerData} from "../hero-answer-data";
import {ComicAnswerData} from "../comic-answer-data";
import {ConfigurationService} from "./configuration.service";

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  constructor(private http: HttpClient, private messageService: MessageService, private config: ConfigurationService) {
    this.config = config;
    this.serviceUrl = config.getApiBaseUrl();
  }

  private log(message: string) {
    this.messageService.add(`ComicService: ${message}`);
  }


  getComics(offset: number, count: number): Observable<ComicAnswerData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Range':  `items=${offset+1}-${offset+count}`
      })
    };
    return this.http.get<HeroAnswerData>(`${this.serviceUrl}/${this.config.get('comicsEndpoint')}`, httpOptions);
  }
}
