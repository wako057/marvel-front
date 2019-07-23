import { Component, OnInit } from '@angular/core';
import { ComicService } from '../services/comic.service';
import { PaginatorInfos } from '../paginatorInfos';
import { ComicAnswerData } from '../comic-answer-data';
import { Comic } from '../comic';
import {AccessMarvel} from "../access-marvel";
import {PageEvent} from "@angular/material";

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {
  paginatorInfos: PaginatorInfos;
  private resultsComics: ComicAnswerData;
  comics: Comic[];
  access: AccessMarvel;

  constructor(private comicService: ComicService) {
    this.paginatorInfos = new PaginatorInfos(0, 20,null, 0);
  }

  ngOnInit() {
    this.getComics();
  }

  private setComicServiceAnswer(answer: ComicAnswerData) {
    this.resultsComics = answer;
    this.paginatorInfos.offset = answer.data.offset;
    this.paginatorInfos.limit = answer.data.limit;
    this.paginatorInfos.total = answer.data.total;
    this.paginatorInfos.count = answer.data.count;
    this.comics = answer.data.results;
    this.access = answer.data.access;
  }

  public getServerData(event?: PageEvent) {


    this.comicService.getComics(event.pageIndex * event.pageSize, event.pageSize)
      .subscribe(answer => {
          // console.log(answer);
          this.setComicServiceAnswer(answer);
        },
        error =>{
          console.log(error);
        }
      );
    return event;
  }

  getComics(): void {
    this.comicService.getComics(this.paginatorInfos.offset, this.paginatorInfos.limit)
      .subscribe(answer => {
        console.log(answer);
        this.setComicServiceAnswer(answer);
        // this.debugPaginator();
      });
  }
}
