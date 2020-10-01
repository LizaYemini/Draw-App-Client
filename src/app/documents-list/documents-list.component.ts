import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentDto } from '../DTO/document-dto';
import { ConfirmationDialogService } from '../Services/confirmation-dialog.service';
import { DocumentsService } from '../Services/documents.service';
import { SharedDataService } from '../Services/shared-data.service';
import { SharedDocumentsService } from '../Services/shared-documents.service';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {
  closeResult = '';
  userId: string
  selectedDocToEdit: DocumentDto
  selectedDocToShare: DocumentDto
  documents: DocumentDto[]
  subscriptionDocs: Subscription
  constructor(sharedDataService: SharedDataService, private documentsService: DocumentsService,
    private confirmationDialogService: ConfirmationDialogService, private modalService: NgbModal) {
    this.selectedDocToEdit = null
    sharedDataService.currentMessage.subscribe(msg => this.userId = msg)
    this.SubscribeOnSubjects()
  }

  ngOnInit(): void {
    this.documentsService.GetDocsByOwnerId({ "Owner": this.userId })
    const source = interval(5000);
    this.subscriptionDocs = source.subscribe(val => {
      this.documentsService.GetDocsByOwnerId({ "Owner": this.userId })
    });

  }

  ngOnDestroy() {
    this.subscriptionDocs.unsubscribe();
  }

  SubscribeOnSubjects() {
    this.documentsService.onGetDocsByOwnerIdResponseOk().subscribe
      (
        response => {
          this.documents = []
          response.documents.forEach(element => {
            this.documents.push(Object.assign(new DocumentDto(), element))
          })
        }
      )

    this.documentsService.onRemoveDocumentResponseOk().subscribe
      (
        response => {
          this.documentsService.GetDocsByOwnerId({ "Owner": this.userId })
        }
      )
    this.documentsService.onError().subscribe
      (
        //Todo Navigate to exit page
        message => {
          console.log(message.message)
        }
      )
  }
  editDoc(document) {
    this.subscriptionDocs.unsubscribe();
    this.selectedDocToEdit = document
  }
  removeDoc(document) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to to delete ' + "'" + document.documentName + "'" + '?')
      .then((confirmed) => {
        this.documentsService.RemoveDocument({ "DocId": document.docId })
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  shareDoc(document) {
    this.selectedDocToShare = document
  }
  closeEditDoc() {
    this.selectedDocToEdit = null
  }

  closeShareDoc() {
    this.selectedDocToShare = null
  }
}
