import { Injectable } from '@angular/core';
import { fromEvent, interval, Subject } from 'rxjs';
import { buffer, switchMap, takeUntil } from 'rxjs/operators';
import { CreateMarkerRequest } from '../DTO/create-marker-request';
import { MarkerDto } from '../DTO/marker-dto';
import { DrawPoly } from '../general/draw-poly';
import { FreeDrawLine } from '../general/free-draw-line';
import { point } from '../general/point';
import { DrawingService } from './drawing.service';
import { MarkerFactoryService } from './marker-factory.service';
import { MarkerMessangerService } from './marker-messanger.service';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class LocalDrawingService {
  responseSubjects = {
    FreeDraw: new Subject<any>(),
    DrawPoly: new Subject<any>(),
    ClearPoly: new Subject<any>(),
    MarkersList: new Subject<any>(),
    AppMarkerDtoError: new Subject<any>(),
    ClearDrawingCanvas: new Subject<any>(),
    ClearShapeCanvas: new Subject<any>()
  }

  allMarkers = new Map<string, DrawPoly>()

  evt = new Subject<any>()
  canvas: object
  // information
  userId: string
  drawingCanvas: any
  shapeCanvas: any
  chosenShape: string = 'Ellipse'
  docId: string
  markerId: string
  foreColor: string = 'white'
  backColor: string = 'black'
  selectedMarkerId: any
  //ShapeRectangle = new Subject<any>()

  poly: Subject<point>

  constructor(private drawingService: DrawingService, private markerMessangerService: MarkerMessangerService, private sharedDataService: SharedDataService,
    private markerFactory: MarkerFactoryService) {
    markerMessangerService.startSocket()
    this.poly = new Subject<point>()
    this.sharedDataService.currentMessage.subscribe(msg => {
      this.userId = msg
    })
    this.SubscribeOnSubjects()
  }

  freeDraw(evt) {
    var canvas = this.drawingCanvas.nativeElement
    var rect = canvas.getBoundingClientRect();
    //the place on the canvas
    var xcanvas = evt.clientX - rect.left
    var ycanvas = evt.clientY - rect.top
    var from: point = new point(xcanvas - evt.movementX, ycanvas - evt.movementY)
    var to: point = new point(xcanvas, ycanvas)
    var line: FreeDrawLine = new FreeDrawLine(from, to, this.foreColor)
    this.responseSubjects.FreeDraw.next(line)
    //update poly
    this.poly.next(new point(xcanvas - evt.movementX, ycanvas - evt.movementY))
  }
  // START SUBSCRIBE
  SubscribeOnSubjects() {
    this.markerMessangerService.onNewMarkerResponse().subscribe
      (
        response => {
          this.addMarker(response.marker as MarkerDto)
        }
      )
    this.markerMessangerService.onRemoveMarkerResponse().subscribe
      (
        response => {
          this.removeMarker(response.markerId)
        }
      )

    this.markerMessangerService.onUpdateMarkerWebSocketRespose().subscribe
      (
        response => {
          this.addMarker(response.marker as MarkerDto)
        }
      )
    this.drawingService.onError().subscribe
      (
        message => {
          this.responseSubjects.AppMarkerDtoError.next(message)
        }
      )
    this.drawingService.onCreateMarkerResponseOk().subscribe
      (
        response => {
          //var poly = this.markerFactory.makePolyFromMarkerDto(response.marker as MarkerDto)
          //this.handleNewMarker(response.marker.markerId, poly)
        }
      )

    this.drawingService.onGetMarkersResponseOk().subscribe
      (
        response => {
          this.allMarkers = new Map<string, DrawPoly>()
          this.responseSubjects.ClearShapeCanvas.next("")
          response.markers.forEach(element => {
            var tempPoly = this.markerFactory.makePolyFromMarkerDto(element)

            this.allMarkers.set(element.markerId, tempPoly)
            //this.MarkerDtoSubjects.DrawPoly.next(tempPoly)
          });
          this.drawAllMarkers()
          //this.MarkerDtoSubjects.MarkersList.next(this.allMarkers)
        }
      )
    this.drawingService.onRemoveMarkerResponseOk().subscribe
      (
        response => {
          this.removeMarker(response.markerId)
        }
      )

    this.drawingService.onUpdateMarkerResponseOk().subscribe
      (
        response => {
          this.addMarker(response.marker as MarkerDto)
          //var poly = this.markerFactory.makePolyFromMarkerDto(response.marker as MarkerDto)

          //this.handleNewMarker(response.marker.markerId, poly)
        }
      )
  } // END SUBSCRIBE

  // START ON FUNCTIONS
  onClearDrawingCanvas(): Subject<any> {
    return this.responseSubjects.ClearDrawingCanvas
  }

  onClearShapeCanvas(): Subject<any> {
    return this.responseSubjects.ClearShapeCanvas
  }
  onFreeDraw(): Subject<any> {
    //return this.MarkerDtoSubjects.FreeDraw
    return this.responseSubjects.FreeDraw
  }

  onDrawPoly(): Subject<any> {
    return this.responseSubjects.DrawPoly
  }

  onMarkersList(): Subject<any> {
    return this.responseSubjects.MarkersList
  }
  onError(): Subject<any> {
    return this.responseSubjects.AppMarkerDtoError
  }
  // END ON FUNCTIONS



  drawPoly(shape) {
    if (shape.length != 0) {
      var center = new point(0, 0)
      center = shape.reduce((acc, pt) => acc.add(pt))
      center = center.div(shape.length)
      var radius = new point(0, 0)
      radius = shape.reduce((acc, pt) => acc.add(new point(Math.abs(pt.X - center.X), Math.abs(pt.Y - center.Y))))
      radius = radius.div(shape.length)
      var locationX = center.X - radius.X
      var locationY = center.Y - radius.Y
      var width = radius.X * 2
      var height = radius.Y * 2
      var marker = this.markerFactory.createMarkerDto("", this.docId, this.chosenShape, this.foreColor, this.backColor,
        this.userId, locationX, locationY, width, height)
      this.createMarkerOnService(marker)
    }
  }
  startDraw(drawingCanvas: any, shapeCanvas: any, docId: string) {
    this.docId = docId
    this.drawingService.GetMarkers({ "DocID": this.docId })
    this.drawingCanvas = drawingCanvas
    this.shapeCanvas = shapeCanvas
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
      event => {
        this.freeDraw(event)
      },
    )

    this.poly.pipe(
      buffer(mouseUp$)
    ).subscribe(shape => {
      this.responseSubjects.ClearDrawingCanvas.next("")
      this.drawPoly(shape)
    },
      error => this.onError().next(error))
  }

  changeShape(shape) {
    this.chosenShape = shape
  }


  addMarker(marker: MarkerDto) {
    var poly = this.markerFactory.makePolyFromMarkerDto(marker)
    this.allMarkers.set(marker.markerId, poly)
    // draw the new marker
    this.responseSubjects.DrawPoly.next(poly)
  }

  reDrawMarkers() {
    //this.allMarkers = new Map<string, DrawPoly>()
    this.responseSubjects.ClearShapeCanvas.next("")
    this.drawAllMarkers()
  }
  drawAllMarkers() {
    this.allMarkers.forEach(poly => {
      this.responseSubjects.DrawPoly.next(poly)
    });
    this.responseSubjects.MarkersList.next(this.allMarkers)
  }

  createMarkerOnService(marker: MarkerDto) {
    var request: CreateMarkerRequest = new CreateMarkerRequest
    request.Marker = marker
    this.drawingService.CreateMarker(request)
  }

  UpdateMarkerOnService(marker: MarkerDto) {
    var request: CreateMarkerRequest = new CreateMarkerRequest
    request.Marker = marker
    this.drawingService.UpdateMarker(request)
  }

  handleChangeInMarker(markerId, forColor, backColor) {
    var poly = this.allMarkers.get(this.selectedMarkerId)
    var marker = this.markerFactory.createMarkerDto(this.selectedMarkerId, this.docId, poly.shapeType, this.foreColor, this.backColor, this.userId,
      poly.LocationX, poly.LocationY, poly.Width, poly.Height)
    this.UpdateMarkerOnService(marker)
  }

  removeMarker(markerId) {
    console.log(markerId)
    this.responseSubjects.ClearPoly.next(
      this.allMarkers.get(markerId)
    )
    this.allMarkers.delete(markerId)
    this.responseSubjects.ClearShapeCanvas.next("")
    this.drawAllMarkers()
    console.log("removed marker ok")
  }
  //START SETTERS
  changeForeColor(color) {
    this.foreColor = color
    if (this.selectedMarkerId != null) {
      console.log(this.selectedMarkerId)
      var marker = this.allMarkers.get(this.selectedMarkerId)
      this.handleChangeInMarker(this.selectedMarkerId, color, marker.backColor)
    }
  }
  changeBackColor(color) {
    this.backColor = color
    if (this.selectedMarkerId != null) {
      var marker = this.allMarkers.get(this.selectedMarkerId)
      this.handleChangeInMarker(this.selectedMarkerId, marker.foreColor, color)
    }
  }

  setSelectedMarkerId(markerId) {
    this.selectedMarkerId = markerId
  }
  //END SETTERS
}


/*
 saveLine(xCanvas: number, xEvent: number, yCanvas: number, yEvent: number) {
   this.poly.next(new point(xCanvas - xEvent, yCanvas - yEvent))
 } */
