import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateShareRequest } from '../DTO/create-share-request';
import { GetShareByDocIdRequest } from '../DTO/get-share-by-doc-id-request';
import { RemoveShareRequest } from '../DTO/remove-share-request';
import { CommService } from './comm.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDocumentsService {
  ResponseSubjects = {
    GetAllUsersResponseOk: new Subject<any>(),
    CreateShareResponseOk: new Subject<any>(),
    RemoveShareResponseOk: new Subject<any>(),
    GetShareByDocIdResponseOk: new Subject<any>()
  }
  AppResponseError = new Subject<any>()

  constructor(private commService: CommService) { }

  onError(): Subject<any> {
    return this.AppResponseError
  }

  onGetAllUsersResponseOk(): Observable<any> {
    return this.ResponseSubjects.GetAllUsersResponseOk
  }

  onCreateShareResponseOk(): Observable<any> {
    return this.ResponseSubjects.CreateShareResponseOk
  }

  onRemoveShareResponseOk(): Observable<any> {
    return this.ResponseSubjects.RemoveShareResponseOk
  }

  onGetShareByDocIdResponseOk(): Observable<any> {
    return this.ResponseSubjects.GetShareByDocIdResponseOk
  }

  getAllUsers() {
    var obs = this.commService.GetAllUsers()
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

  createShare(request: CreateShareRequest) {
    var obs = this.commService.CreateShare(request)
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

  removeShare(request: RemoveShareRequest) {
    var obs = this.commService.RemoveShare(request)
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

  GetShareByDocId(request: GetShareByDocIdRequest) {
    var obs = this.commService.GetShareByDocId(request)
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
