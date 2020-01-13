import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery.flipster';

@Component({
  selector: 'app-resultcarousel',
  templateUrl: './resultcarousel.component.html',
  styleUrls: ['./resultcarousel.component.css']
})
export class ResultcarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $("#carousel").flipster({
      style: 'carousel',
      spacing: -0.5,
      nav: true,
      buttons: true,
    });
  }

}
