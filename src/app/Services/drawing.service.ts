import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { buffer, map, switchMap, takeUntil } from 'rxjs/operators';
import { CreateMarkerRequest } from '../DTO/create-marker-request';
import { GetMarkersRequest } from '../DTO/get-markers-request';
import { RemoveMarkerRequest } from '../DTO/remove-marker-request';
import { point } from '../general/point';
import { CommService } from './comm.service';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {
  ResponseSubjects = {
    CreateMarkerResponseOk: new Subject<any>(),
    RemoveMarkerResponseOk: new Subject<any>(),
    GetMarkersResponseOk: new Subject<any>(),
    UpdateMarkerResponseOk: new Subject<any>(),
    AppResponseError: new Subject<any>()
  }

  constructor(private commService: CommService) {
  }

  onError(): Subject<any> {
    return this.ResponseSubjects.AppResponseError
  }

  onCreateMarkerResponseOk(): Observable<any> {
    return this.ResponseSubjects.CreateMarkerResponseOk
  }

  onRemoveMarkerResponseOk(): Observable<any> {
    return this.ResponseSubjects.RemoveMarkerResponseOk
  }
  onGetMarkersResponseOk(): Observable<any> {
    return this.ResponseSubjects.GetMarkersResponseOk
  }
  onUpdateMarkerResponseOk(): Observable<any> {
    return this.ResponseSubjects.UpdateMarkerResponseOk
  }

  CreateMarker(request: CreateMarkerRequest) {
    var obs = this.commService.CreateMarker(request)
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

  RemoveMarker(request: RemoveMarkerRequest) {
    var obs = this.commService.RemoveMarker(request)
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

  GetMarkers(request: GetMarkersRequest) {
    var obs = this.commService.GetMarkers(request)
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

  UpdateMarker(request: CreateMarkerRequest) {
    var obs = this.commService.UpdateMarker(request)
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
