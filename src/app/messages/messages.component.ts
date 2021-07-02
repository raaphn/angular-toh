import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  
  //binding the service to the template so it can be used in other components
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
