import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from "./hero";
import { HttpClient } from "@angular/common/http";
import { MessageService } from './message.service';
import {ConfigService} from "./config.service";
import {Config} from "./config";
import {HeroAnswerData} from "./hero-answer-data";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  config: Config;

  constructor(private http: HttpClient, private messageService: MessageService, private configService: ConfigService) {

    // this.configService.getConfig()
    //   .subscribe((data: Config) => {
    //     this.config = { ...data };
    //     this.log(JSON.stringify(data));
    //     this.log(JSON.stringify(this.config));
    //   });
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes(): Observable<HeroAnswerData> {
    this.messageService.add('HeroService: fetched heroes blu');

    return this.http.get<HeroAnswerData>('http://localhost:8080/v1/heroes');
  }
}
