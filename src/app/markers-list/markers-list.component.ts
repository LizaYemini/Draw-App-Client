import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DrawPoly } from '../general/draw-poly';
import { ConfirmationDialogService } from '../Services/confirmation-dialog.service';
import { DrawingService } from '../Services/drawing.service';

@Component({
  selector: 'app-markers-list',
  templateUrl: './markers-list.component.html',
  styleUrls: ['./markers-list.component.css']
})
export class MarkersListComponent implements OnInit {
  @Input() markers = new Map<string, DrawPoly>()
  @Output() selectedMarker = new EventEmitter<any>()
  selectedMarkerShow: any
  constructor(private confirmationDialogService: ConfirmationDialogService, private drawingService: DrawingService) { }

  ngOnInit(): void {
    console.log("init marker list")
  }


  onSelect(marker: any): void {
    this.selectedMarker.emit(marker)
    this.selectedMarkerShow = marker
  }

  removeMarker(markerId: string): void {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to to delete this marker?')
      .then((confirmed) => {
        this.drawingService.RemoveMarker({ "MarkerID": markerId })
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
