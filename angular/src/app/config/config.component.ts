import { Component, OnInit } from '@angular/core';
import { ConfigService } from "../config.service";
import {Config} from "../config";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})

export class ConfigComponent implements OnInit {

  constructor(private configService: ConfigService) { }

  ngOnInit() {
  }

  config: Config;

  showConfig() {
    this.configService.getConfig()
    // clone the data object, using its known Config shape
      .subscribe((data: Config) => this.config = { ...data });
  }
}
