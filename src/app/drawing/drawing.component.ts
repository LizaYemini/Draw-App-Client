import { Portal } from '@angular/cdk/portal';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ColorEvent } from 'ngx-color';
import { ColorChromeModule } from 'ngx-color/chrome'; // 
import { DrawPoly } from '../general/draw-poly';
import { point } from '../general/point';
import { DrawingService } from '../Services/drawing.service';
import { LocalDrawingService } from '../Services/local-drawing.service';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css']
})
export class DrawingComponent implements OnInit {
  @Input() imgUrl: string
  @Input() userId: string
  @Input() docId: string
  @ViewChild('shapeCanvas', { static: false }) shapeCanvas: ElementRef;
  @ViewChild('drawingCanvas', { static: false }) drawingCanvas: ElementRef;
  @ViewChild('stickingOutCanvas', { static: false }) stickingOutCanvas: ElementRef;
  markersList = new Map<string, DrawPoly>()
  selectedMarkerShow: any
  constructor(private localDrawingService: LocalDrawingService) { }

  ngOnInit(): void {
    this.SubscribeOnSubjects()
  }


  ngAfterViewInit() {
    var ctx1 = this.shapeCanvas.nativeElement.getContext('2d')
    this.shapeCanvas.nativeElement.width = 500
    this.shapeCanvas.nativeElement.height = 500
    this.stickingOutCanvas.nativeElement.width = 500
    this.stickingOutCanvas.nativeElement.height = 500
    this.drawingCanvas.nativeElement.width = 500
    this.drawingCanvas.nativeElement.height = 500
    //this.localDrawingService.updateDocId(this.docId)
    this.localDrawingService.startDraw(this.drawingCanvas, this.shapeCanvas, this.docId)
  }

  changeShape(chosenShape: string) {
    //this.shape = chosenShape
    this.localDrawingService.changeShape(chosenShape)
  }
  SubscribeOnSubjects() {
    this.localDrawingService.onFreeDraw().subscribe
      (
        line => {
          //console.log(line)
          var ctx2 = this.drawingCanvas.nativeElement.getContext('2d')
          line.draw(ctx2)
        }
      )
    this.localDrawingService.onClearDrawingCanvas().subscribe
      (
        msg => {
          var canvas = this.drawingCanvas.nativeElement
          var ctx2 = canvas.getContext('2d')
          ctx2.clearRect(0, 0, this.drawingCanvas.nativeElement.width, this.drawingCanvas.nativeElement.height);
        }
      )

    this.localDrawingService.onClearShapeCanvas().subscribe
      (
        msg => {
          var canvas = this.shapeCanvas.nativeElement
          var ctx2 = canvas.getContext('2d')
          ctx2.clearRect(0, 0, this.shapeCanvas.nativeElement.width, this.shapeCanvas.nativeElement.height);
        }
      )
    this.localDrawingService.onDrawPoly().subscribe
      (
        poly => {
          //console.log(poly)
          var ctx2 = this.shapeCanvas.nativeElement.getContext('2d')
          poly.draw(ctx2)
        }
      )
    this.localDrawingService.onMarkersList().subscribe
      (
        list => {
          this.markersList = list
          //console.log(this.markersList)
        }
      )
    this.localDrawingService.onError().subscribe
      (
        //Todo Navigate to exit page
        message => {
          console.log(message.message)
        }
      )


  }

  handleChangeBackColor($event: ColorEvent) {
    this.localDrawingService.changeBackColor($event.color.hex)
  }

  handleChangeForeColor($event: ColorEvent) {
    this.localDrawingService.changeForeColor($event.color.hex)
  }

  onChooseMarker($event) {
    this.clearStickingOutCanvas()
    //console.log($event.value)
    //this.selectedMarkerShow = $event
    if ($event != null) {
      this.localDrawingService.setSelectedMarkerId($event.key)
      var poly = $event.value
      var ctx3 = this.stickingOutCanvas.nativeElement.getContext('2d')
      poly.stickOut(ctx3)
    } else {
      this.localDrawingService.setSelectedMarkerId(null)
    }
  }

  clearStickingOutCanvas() {
    var canvas = this.stickingOutCanvas.nativeElement
    var ctx3 = canvas.getContext('2d')
    ctx3.clearRect(0, 0, this.shapeCanvas.nativeElement.width, this.shapeCanvas.nativeElement.height);
  }
}
