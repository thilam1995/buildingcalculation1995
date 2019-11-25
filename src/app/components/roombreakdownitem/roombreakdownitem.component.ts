import { Component, OnInit } from '@angular/core';
import { RoomserviceService } from 'src/app/service/roomservice.service';

@Component({
  selector: 'app-roombreakdownitem',
  templateUrl: './roombreakdownitem.component.html',
  styleUrls: ['./roombreakdownitem.component.css']
})
export class RoombreakdownitemComponent implements OnInit {

  constructor(private roomserv: RoomserviceService) { }

  ngOnInit() {
  }

}
