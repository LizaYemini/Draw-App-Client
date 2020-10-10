import { Injectable } from '@angular/core';
import { MarkerDto } from '../DTO/marker-dto';
import { DrawPolyEllipse } from '../general/draw-poly-ellipse';
import { DrawPolyRectangle } from '../general/draw-poly-rectangle';

@Injectable({
  providedIn: 'root'
})
export class MarkerFactoryService {

  constructor() { }

  // MOVE TO ANOTHER CLASS
  makePolyFromMarkerDto(MarkerDto) {
    var poly
    if (MarkerDto.markerType == 'Ellipse') {

      poly = new DrawPolyEllipse(MarkerDto.locationX, MarkerDto.locationY, MarkerDto.width, MarkerDto.height, MarkerDto.forColor, MarkerDto.backColor)
    }
    else if (MarkerDto.markerType == 'Rectangle') {
      poly = new DrawPolyRectangle(MarkerDto.locationX, MarkerDto.locationY, MarkerDto.width, MarkerDto.height, MarkerDto.forColor, MarkerDto.backColor)
    }
    return poly
  }

  // MOVE TO ANOTHER CLASS
  createMarkerDto(markerId, docId, chosenShape, foreColor, backColor, userId, locationX, locationY, width, height) {
    var marker = new MarkerDto()
    marker.markerId = markerId
    marker.userId = userId
    marker.docId = docId
    marker.backColor = backColor
    marker.forColor = foreColor
    marker.height = height
    marker.width = width
    marker.markerType = chosenShape
    marker.locationX = locationX
    marker.locationY = locationY
    return marker
  }
}
