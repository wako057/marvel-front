import { Component, OnInit } from '@angular/core';
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
// import { MessageService } from "../message.service";
import { AccessMarvel } from "../access-marvel";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];
  access: AccessMarvel;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes()
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(answer => {
        console.log(answer);
        this.heroes = answer.data.results;
        this.access = answer.data.access;

      })
    ;

    // this.messageService.add(JSON.stringify(this.heroes));
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
