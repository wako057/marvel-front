import { MarvelAnswer } from "./marvel-answer";
import { Hero } from "./hero";
import { AccessMarvel } from "./access-marvel";

export class HeroAnswerData extends MarvelAnswer {
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    access: AccessMarvel;
    results: Hero[];
  }
}
