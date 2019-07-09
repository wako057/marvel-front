import {Thumbnail} from "./thumbnail";
import {Comics} from "./comics";
import {Series} from "./series";
import {Stories} from "./stories";
import {HeroesEvents} from "./heroes-events";
import {HeroesUrl} from "./heroes-url";
import {MarvelAnswer} from "./marvel-answer";

export class Hero extends MarvelAnswer {

  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Comics;
  series: Series;
  stories: Stories;
  events: HeroesEvents;
  urls: HeroesUrl[];
}
