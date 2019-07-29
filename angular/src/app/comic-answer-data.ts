
import { MarvelAnswer } from "./marvel-answer";
import { Comic } from "./comic";
import { AccessMarvel } from "./access-marvel";

export class ComicAnswerData extends MarvelAnswer {
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    access: AccessMarvel;
    results: Comic[];
  }
}
