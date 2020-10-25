import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateLiveWatchDocRequest } from '../DTO/LiveWatch/create-live-watch-doc-request';
import { GetWatchersOfDocRequest } from '../DTO/LiveWatch/get-watchers-of-doc-request';
import { RemoveLiveWatchDocRequest } from '../DTO/LiveWatch/remove-live-watch-doc-request';
import { CommService } from './comm.service';

@Injectable({
  providedIn: 'root'
})
export class LiveWatchService {
  ResponseSubjects = {
    CreateLiveWatchDocResponseOk: new Subject<any>(),
    GetWatchersOfDocResponseOk: new Subject<any>(),
    RemoveLiveWatchDocResponseOk: new Subject<any>(),
    AppResponseError: new Subject<any>()
  }

  constructor(private commService: CommService) { }

  onError(): Subject<any> {
    return this.ResponseSubjects.AppResponseError
  }

  onCreateLiveWatchResponseOk(): Observable<any> {
    return this.ResponseSubjects.CreateLiveWatchDocResponseOk
  }

  onGetWatchersOfDocResponseOk(): Observable<any> {
    return this.ResponseSubjects.GetWatchersOfDocResponseOk
  }

  onRemoveLiveWatchDocResponseOk(): Observable<any> {
    return this.ResponseSubjects.RemoveLiveWatchDocResponseOk
  }

  CreateLiveWatchDoc(request: CreateLiveWatchDocRequest) {
    var obs = this.commService.CreateLiveWatchDoc(request)
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

  GetWatchersOfDoc(request: GetWatchersOfDocRequest) {
    var obs = this.commService.GetWatchersOfDoc(request)
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

  RemoveLiveWatchDoc(request: RemoveLiveWatchDocRequest) {
    var obs = this.commService.RemoveLiveWatchDoc(request)
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
