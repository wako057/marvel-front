import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable} from "rxjs";
import {HeroAnswerData} from "./hero-answer-data";
import {ComicAnswerData} from "./comics-answer-data";

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  constructor(private http: HttpClient, private messageService: MessageService) {

  }

  private log(message: string) {
    this.messageService.add(`ComicService: ${message}`);
  }


  getComics(offset: number, count: number): Observable<ComicAnswerData> {
    // this.messageService.add('HeroService: fetched heroes blu');
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Range':  `items=${offset+1}-${offset+count}`
      })
    };
    return this.http.get<HeroAnswerData>('http://localhost:8080/v1/heroes', httpOptions);
  }
}
