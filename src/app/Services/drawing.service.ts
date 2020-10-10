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
  /*
  canvas: object
  chosenShape: string
  docId: string
  markerId: string
  chosenColor: string = 'black'
  evt = new Subject<any>()
  ShapeEllipse = new Subject<any>()
  ShapeRectangle = new Subject<any>()
  clearCanvas = new Subject<any>()
  poly: Subject<point>
  responseError = new Subject<any>()
  constructor() {
    this.poly = new Subject<point>()
  }

  onClearCanvas(): Subject<any> {
    return this.clearCanvas
  }
  onError(): Subject<any> {
    return this.responseError
  }

  onFreeDraw(): Subject<any> {
    return this.evt
  }

  onDrawEllipse(): Subject<any> {
    return this.ShapeEllipse
  }

  onDrawRectangle(): Subject<any> {
    return this.ShapeRectangle
  }
  startDraw(drawingCanvas: any) {
    var mouseUp$ = fromEvent(drawingCanvas.nativeElement, 'mouseup')
    var mousedown$ = fromEvent(drawingCanvas.nativeElement, 'mousedown')
    var draw$ = mousedown$.pipe(
      // restart counter on every click
      switchMap(event =>
        fromEvent(drawingCanvas.nativeElement, 'mousemove').pipe(
          takeUntil(mouseUp$)
        ))
    )

    draw$.subscribe(
      event => this.evt.next(event),
    )

    this.poly.pipe(
      buffer(mouseUp$)
    ).subscribe(shape => {
      this.clearCanvas.next("")
      this.ShapeEllipse.next(shape)
    },
      error => this.onError().next(error))
  }

  saveLine(xCanvas: number, xEvent: number, yCanvas: number, yEvent: number) {
    this.poly.next(new point(xCanvas - xEvent, yCanvas - yEvent))
  }

  changeShape(shape: string) {
    this.chosenShape = shape
  }

  changeColor(color: string) {
    this.chosenColor = color
  }
  /*
  createDocumentMarker(shape): DocumentMarkerDto {
    var center = new point(0, 0)
    center = shape.reduce((acc, pt) => acc.add(pt))
    center = center.div(shape.length)
    var radius = new point(0, 0)
    radius = shape.reduce((acc, pt) => acc.add(new point(Math.abs(pt.X - center.X), Math.abs(pt.Y - center.Y))))
    radius = radius.div(shape.length)
    var x = c
  } */
}
