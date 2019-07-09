import { MarvelAnswer } from "./marvel-answer";
import { Hero } from "./hero";

export class HeroAnswerData extends MarvelAnswer {
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Hero[];
  }
}
