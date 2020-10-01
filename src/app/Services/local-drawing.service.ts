import { Injectable } from '@angular/core';
import { fromEvent, interval, Subject } from 'rxjs';
import { buffer, switchMap, takeUntil } from 'rxjs/operators';
import { DrawPoly } from '../general/draw-poly';
import { DrawPolyEllipse } from '../general/draw-poly-ellipse';
import { DrawPolyRectangle } from '../general/draw-poly-rectangle';
import { FreeDrawLine } from '../general/free-draw-line';
import { point } from '../general/point';
import { DrawingService } from './drawing.service';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class LocalDrawingService {
  ResponseSubjects = {
    FreeDraw: new Subject<any>(),
    DrawPoly: new Subject<any>(),
    ClearPoly: new Subject<any>(),
    MarkersList: new Subject<any>(),
    AppResponseError: new Subject<any>(),
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

  constructor(private drawingService: DrawingService, private sharedDataService: SharedDataService) {
    this.poly = new Subject<point>()
    this.sharedDataService.currentMessage.subscribe(msg => {
      this.userId = msg
    })
    this.SubscribeOnSubjects()
  }


  SubscribeOnSubjects() {
    this.drawingService.onError().subscribe
      (
        message => {
          this.ResponseSubjects.AppResponseError.next(message)
        }
      )
    this.drawingService.onCreateMarkerResponseOk().subscribe
      (
        response => {
          var poly = this.makePolyFromResponse(response)
          //this.ResponseSubjects.DrawPoly.next(poly)
          this.handleNewMarker(response.markerId, poly)
          //this.drawAllMarkers()
        }
      )

    this.drawingService.onGetMarkersResponseOk().subscribe
      (
        response => {
          this.allMarkers = new Map<string, DrawPoly>()
          this.ResponseSubjects.ClearShapeCanvas.next("")
          response.markers.forEach(element => {
            var tempPoly = this.makePolyFromResponse(element)

            this.allMarkers.set(element.markerId, tempPoly)
            //this.ResponseSubjects.DrawPoly.next(tempPoly)
          });
          this.drawAllMarkers()
          //this.ResponseSubjects.MarkersList.next(this.allMarkers)
        }
      )
    this.drawingService.onRemoveMarkerResponseOk().subscribe
      (
        response => {
          //console.log(response)
          this.ResponseSubjects.ClearPoly.next(
            this.allMarkers.get(response.markerId)
          )
          //this.onClearDrawingCanvas()
          this.allMarkers.delete(response.markerId)
          this.ResponseSubjects.ClearShapeCanvas.next("")
          this.drawAllMarkers()
          console.log("removed marker ok")
        }
      )

    this.drawingService.onUpdateMarkerResponseOk().subscribe
      (
        response => {

          var poly = this.makePolyFromResponse(response)
          this.handleNewMarker(response.markerId, poly)
          //this.allMarkers.get(response.markerId).changeForeColor(response.ForColor)
          //this.allMarkers.get(response.markerId).changeBackColor(response.BackColor)
          //this.reDrawMarkers()
        }
      )
  }
  onClearDrawingCanvas(): Subject<any> {
    return this.ResponseSubjects.ClearDrawingCanvas
  }

  onClearShapeCanvas(): Subject<any> {
    return this.ResponseSubjects.ClearShapeCanvas
  }
  onFreeDraw(): Subject<any> {
    //return this.ResponseSubjects.FreeDraw
    return this.ResponseSubjects.FreeDraw
  }

  onDrawPoly(): Subject<any> {
    return this.ResponseSubjects.DrawPoly
  }

  onMarkersList(): Subject<any> {
    return this.ResponseSubjects.MarkersList
  }
  onError(): Subject<any> {
    return this.ResponseSubjects.AppResponseError
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
    this.ResponseSubjects.FreeDraw.next(line)
    //update poly
    this.poly.next(new point(xcanvas - evt.movementX, ycanvas - evt.movementY))
  }

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
      // send the poly to the server
      this.createMarkerOnService(height, width, locationX, locationY)
    }
  }
  startDraw(drawingCanvas: any, shapeCanvas: any) {
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
      this.ResponseSubjects.ClearDrawingCanvas.next("")
      this.drawPoly(shape)
    },
      error => this.onError().next(error))
  }

  changeShape(shape) {
    this.chosenShape = shape
  }

  changeForeColor(color) {
    this.foreColor = color
    if (this.selectedMarkerId != null) {
      console.log(this.selectedMarkerId)
      var marker = this.allMarkers.get(this.selectedMarkerId)
      this.handleChangeInMarker(this.selectedMarkerId, color, marker.backColor)
      //var marker = this.allMarkers.get(this.selectedMarkerId)
      //this.drawingService.UpdateMarker
      //this.drawingService.RemoveMarker({ "MarkerID": this.selectedMarkerId })
      //this.createMarkerOnService(marker.Height, marker.Width, marker.LocationX, marker.LocationY)
      //this.allMarkers.get(this.selectedMarkerId).changeForeColor(color)
      //this.reDrawMarkers()
    }
  }
  changeBackColor(color) {
    this.backColor = color
    if (this.selectedMarkerId != null) {
      var marker = this.allMarkers.get(this.selectedMarkerId)
      this.handleChangeInMarker(this.selectedMarkerId, marker.foreColor, color)
      /*
      console.log(this.selectedMarkerId)
      var marker = this.allMarkers.get(this.selectedMarkerId)
      this.drawingService.RemoveMarker({ "MarkerID": this.selectedMarkerId })
      console.log(marker)
      this.createMarkerOnService(marker.Height, marker.Width, marker.LocationX, marker.LocationY) */
    }
  }

  setSelectedMarkerId(markerId) {
    this.selectedMarkerId = markerId
  }
  updateDocId(docId) {
    this.docId = docId
    this.drawingService.GetMarkers({ "DocID": this.docId })
    /*const source = interval(2000);
    source.subscribe(val => {
      this.drawingService.GetMarkers({ "DocID": this.docId })
    }); */

  }

  handleNewMarker(markerId: string, poly: DrawPoly) {
    this.allMarkers.set(markerId, poly)
    // draw the new marker
    this.ResponseSubjects.DrawPoly.next(poly)
  }

  reDrawMarkers() {
    //this.allMarkers = new Map<string, DrawPoly>()
    this.ResponseSubjects.ClearShapeCanvas.next("")
    this.drawAllMarkers()
  }
  drawAllMarkers() {
    this.allMarkers.forEach(poly => {
      this.ResponseSubjects.DrawPoly.next(poly)
    });
    this.ResponseSubjects.MarkersList.next(this.allMarkers)
  }

  createMarkerOnService(height, width, locationX, locationY) {
    this.drawingService.CreateMarker({
      "UserId": this.userId,
      "DocId": this.docId,
      "BackColor": this.backColor,
      "ForColor": this.foreColor,
      "Height": height,
      "Width": width,
      "MarkerType": this.chosenShape,
      "MarkerId": "",
      "LocationX": locationX,
      "LocationY": locationY
    })
  }

  handleChangeInMarker(markerId, forColor, backColor) {
    var marker = this.allMarkers.get(this.selectedMarkerId)
    this.UpdateMarkerOnService(this.selectedMarkerId, forColor, backColor, marker.Height, marker.Width, marker.LocationX, marker.LocationY)
  }
  UpdateMarkerOnService(markerId, forColor, backColor, height, width, locationX, locationY) {
    this.drawingService.UpdateMarker({
      "UserId": this.userId,
      "DocId": this.docId,
      "BackColor": backColor,
      "ForColor": forColor,
      "Height": height,
      "Width": width,
      "MarkerType": this.chosenShape,
      "MarkerId": markerId,
      "LocationX": locationX,
      "LocationY": locationY
    })
  }


  makePolyFromResponse(response) {
    var poly
    if (response.markerType == 'Ellipse') {
      poly = new DrawPolyEllipse(response.locationX, response.locationY, response.width, response.height, response.forColor, response.backColor)
    }
    else if (response.markerType == 'Rectangle') {
      poly = new DrawPolyRectangle(response.locationX, response.locationY, response.width, response.height, response.forColor, response.backColor)
    }
    return poly
  }
}


/*
 saveLine(xCanvas: number, xEvent: number, yCanvas: number, yEvent: number) {
   this.poly.next(new point(xCanvas - xEvent, yCanvas - yEvent))
 } */
