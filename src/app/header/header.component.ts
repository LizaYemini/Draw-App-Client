import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../Services/shared-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string

  constructor(private sharedDataService: SharedDataService) {
    this.sharedDataService.currentMessage.subscribe(msg => this.userName = msg)
  }

  ngOnInit(): void {
  }

  signOut(): void {
    this.sharedDataService.changeMessage(null)
  }
}
