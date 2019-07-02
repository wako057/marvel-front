import {Thumbnail} from "./thumbnail";
import {Comics} from "./comics";
import {Series} from "./series";
import {Stories} from "./stories";
import {HeroesEvents} from "./heroes-events";
import {HeroesUrl} from "./heroes-url";

export class Hero {
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
