import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { Hero } from "./hero";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { MessageService } from './message.service';
// import {ConfigService} from "./config.service";
// import { Config } from "./config";
import { HeroAnswerData } from "./hero-answer-data";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // config: Config;

  constructor(private http: HttpClient, private messageService: MessageService) {

  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes(offset: number, count: number): Observable<HeroAnswerData> {
    // this.messageService.add('HeroService: fetched heroes blu');
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Range':  `items=${offset+1}-${offset+count}`
      })
    };
    return this.http.get<HeroAnswerData>('http://localhost:8080/v1/heroes', httpOptions);
  }
}
