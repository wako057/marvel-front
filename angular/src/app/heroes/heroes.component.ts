import { Component, OnInit } from '@angular/core';
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { AccessMarvel } from "../access-marvel";
import { HeroAnswerData } from "../hero-answer-data";
import { PaginatorInfos } from "../paginatorInfos";
import { PageEvent } from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "../message.service";


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  resultsHeroes: HeroAnswerData;
  selectedHero: Hero;
  heroes: Hero[];
  access: AccessMarvel;
  paginatorInfos: PaginatorInfos;
  // availableSize: [20, 50, 100];

  constructor(private heroService: HeroService, private messageService: MessageService) {
    this.paginatorInfos = new PaginatorInfos(0, 20,null, 0);
  }

  ngOnInit() {
    // this.getData({pageIndex: this.page, pageSize: this.size});
    // this.debugPaginator();
    this.getHeroes()
  }

  private debugPaginator() {
    this.messageService.add("--------------------------------------");
    this.messageService.add("this.paginatorInfos.pageIndex: " + this.paginatorInfos.pageIndex);
    this.messageService.add("this.paginatorInfos.offset: " + this.paginatorInfos.offset);
    this.messageService.add("this.paginatorInfos.limit : " + this.paginatorInfos.limit );
    this.messageService.add("this.paginatorInfos.total: " + this.paginatorInfos.total);
    this.messageService.add("this.paginatorInfos.count: " + this.paginatorInfos.count);
  }

  private setHeroServiceAnswer(answer: HeroAnswerData) {
    this.resultsHeroes = answer;
    this.paginatorInfos.offset = answer.data.offset;
    this.paginatorInfos.limit = answer.data.limit;
    this.paginatorInfos.total = answer.data.total;
    this.paginatorInfos.count = answer.data.count;
    this.heroes = answer.data.results;
    this.access = answer.data.access;
  }

  public getServerData(event?:PageEvent){

    console.log(event);

    this.heroService.getHeroes(event.pageIndex * event.pageSize, event.pageSize)
      .subscribe(answer => {
          // console.log(answer);
          this.setHeroServiceAnswer(answer);
          // this.debugPaginator();
        },
      error =>{
          console.log(error);
      }
    );
    return event;
  }

  getHeroes(): void {
    this.heroService.getHeroes(this.paginatorInfos.offset, this.paginatorInfos.limit)
      .subscribe(answer => {
        // console.log(answer);
        this.setHeroServiceAnswer(answer);
        // this.debugPaginator();
      });
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
