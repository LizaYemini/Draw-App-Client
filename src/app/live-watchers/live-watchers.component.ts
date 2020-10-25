import { Component, Input, OnInit } from '@angular/core';
import { LiveWatchService } from '../Services/live-watch.service';

@Component({
  selector: 'app-live-watchers',
  templateUrl: './live-watchers.component.html',
  styleUrls: ['./live-watchers.component.css']
})
export class LiveWatchersComponent implements OnInit {
  @Input() docId: string
  @Input() userId: string
  liveWatchers: string[]

  constructor(private liveWatchService: LiveWatchService) { }

  ngOnInit(): void {
    this.SubscribeOnSubjects()
    this.liveWatchService.CreateLiveWatchDoc({ DocId: this.docId, UserId: this.userId })
    this.liveWatchService.GetWatchersOfDoc({ DocId: this.docId })
  }

  ngOnDestroy() {
    console.log("remove live watch " + this.userId)
    this.liveWatchService.RemoveLiveWatchDoc({ DocId: this.docId, UserId: this.userId })
  }

  SubscribeOnSubjects() {
    this.liveWatchService.onError().subscribe
      (
        //Todo Navigate to exit page
        message => {
          console.log(message.message)
        }
      )

    this.liveWatchService.onGetWatchersOfDocResponseOk().subscribe
      (
        ret => {
          this.liveWatchers = ret.usersIds
          console.log(this.liveWatchers)
        }
      )
  }
}
