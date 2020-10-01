import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddDocumentRequest } from '../DTO/add-document-request';
import { GetDocsByOwnerIdRequest } from '../DTO/get-docs-by-owner-id-request';
import { RemoveDocumentRequest } from '../DTO/remove-document-request';
import { UpdateDocumentRequest } from '../DTO/update-document-request';
import { CommService } from './comm.service';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  userName: string

  ResponseSubjects = {
    AddDocumentResponseOk: new Subject<any>(),
    UpdateDocumentResponseOk: new Subject<any>(),
    GetDocsByOwnerIdResponseOk: new Subject<any>(),
    RemoveDocumentResponseOk: new Subject<any>(),
    AppResponseError: new Subject<any>()
  }


  constructor(private commService: CommService, private sharedDataService: SharedDataService) {
    this.sharedDataService.currentMessage.subscribe(msg => {
      this.userName = msg
    })
  }

  onError(): Subject<any> {
    return this.ResponseSubjects.AppResponseError
  }
  onAddDocumentResponseOK(): Observable<any> {
    return this.ResponseSubjects.AddDocumentResponseOk
  }

  onUpdateDocumentResponseOK(): Observable<any> {
    return this.ResponseSubjects.UpdateDocumentResponseOk
  }

  onGetDocsByOwnerIdResponseOk(): Observable<any> {
    return this.ResponseSubjects.GetDocsByOwnerIdResponseOk
  }

  onRemoveDocumentResponseOk(): Observable<any> {
    return this.ResponseSubjects.RemoveDocumentResponseOk
  }

  AddDocument(request: AddDocumentRequest) {
    var obs = this.commService.AddDocument(request)
    var obs2 = obs.pipe(
      map(response => {
        return [this.ResponseSubjects[response.responseType], response]
      }))

    var subscriber = obs2.subscribe(
      ([ResponseSubject, response]) => ResponseSubject.next(response),
      error => this.onError().next(error),
      //() => console.log("Communication Completed")
    )
  }

  UpdateDocument(request: UpdateDocumentRequest) {
    var obs = this.commService.UpdateDocument(request)
    var obs2 = obs.pipe(
      map(response => {
        return [this.ResponseSubjects[response.responseType], response]
      }))

    var subscriber = obs2.subscribe(
      ([ResponseSubject, response]) => ResponseSubject.next(response),
      error => this.onError().next(error),
      //() => console.log("Communication Completed")
    )
  }

  GetDocsByOwnerId(request: GetDocsByOwnerIdRequest) {
    var obs = this.commService.GetDocsByOwnerId(request)
    var obs2 = obs.pipe(
      map(response => {
        return [this.ResponseSubjects[response.responseType], response]
      }))

    var subscriber = obs2.subscribe(
      ([ResponseSubject, response]) => ResponseSubject.next(response),
      error => this.onError().next(error),
      //() => console.log("Communication Completed")
    )
  }

  RemoveDocument(request: RemoveDocumentRequest) {
    var obs = this.commService.RemoveDocument(request)
    var obs2 = obs.pipe(
      map(response => {
        return [this.ResponseSubjects[response.responseType], response]
      }))

    var subscriber = obs2.subscribe(
      ([ResponseSubject, response]) => ResponseSubject.next(response),
      error => this.onError().next(error),
      //() => console.log("Communication Completed")
    )
  }
}


