import { Component, Input, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { SharedDocumentsService } from '../Services/shared-documents.service';

@Component({
  selector: 'app-share-docs',
  templateUrl: './share-docs.component.html',
  styleUrls: ['./share-docs.component.css']
})
export class ShareDocsComponent implements OnInit {
  subscriptionUsers: Subscription
  subscriptionShares: Subscription
  allUsers: string[]
  notSharedUsers: string[]
  alreadySharedUsers: string[]
  @Input() chosenDocId: string
  @Input() userId: string
  constructor(private sharedDocsService: SharedDocumentsService) { }

  ngOnInit(): void {

    this.sharedDocsService.getAllUsers()
    this.sharedDocsService.GetShareByDocId({ DocId: this.chosenDocId })
    /*
    const source = interval(10000);
    this.subscriptionUsers = source.subscribe(val => {
      this.sharedDocsService.getAllUsers()
    })
    this.subscriptionShares = source.subscribe(val => {
      this.sharedDocsService.GetShareByDocId({ DocId: this.chosenDocId })
    }) 
    */
    this.SubscribeOnSubjects()
  }

  ngOnDestroy() {
    //this.subscriptionUsers.unsubscribe();
    //this.subscriptionShares.unsubscribe();
  }

  SubscribeOnSubjects() {

    this.sharedDocsService.onGetAllUsersResponseOk().subscribe
      (
        response => {
          this.allUsers = response.users
          this.allUsers = this.allUsers.filter(user => user !== this.userId)
          this.notSharedUsers = this.allUsers.filter(user => user !== this.userId)
        }
      )

    this.sharedDocsService.onGetShareByDocIdResponseOk().subscribe
      (
        response => {
          this.alreadySharedUsers = response.usersIds
          this.notSharedUsers = this.allUsers.filter(user => user !== this.userId)
          this.alreadySharedUsers.forEach(sharedUser => {
            this.notSharedUsers = this.notSharedUsers.filter(user => user !== sharedUser)
          })
        }
      )

    this.sharedDocsService.onCreateShareResponseOk().subscribe
      (
        response => {
          this.sharedDocsService.GetShareByDocId({ DocId: this.chosenDocId })
        }
      )

    this.sharedDocsService.onRemoveShareResponseOk().subscribe
      (
        response => {
          this.sharedDocsService.GetShareByDocId({ DocId: this.chosenDocId })
        }
      )

    this.sharedDocsService.onError().subscribe
      (
        //Todo Navigate to exit page
        message => {
          console.log(message.message)
        }
      )
  }

  createShare(user) {
    this.sharedDocsService.createShare({ DocId: this.chosenDocId, UserId: user })
  }
  removeShare(user) {
    this.sharedDocsService.removeShare({ DocId: this.chosenDocId, UserId: user })
  }
}
