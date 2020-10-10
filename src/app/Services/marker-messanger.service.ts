import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkerMessangerService {
  private socket: WebSocket;
  ResponseSubjects = {
    NewMarkerWebSocketResponse: new Subject<any>(),
    RemoveMarkerWebSocketResponse: new Subject<any>(),
    UpdateMarkerWebSocketResponse: new Subject<any>()
  }
  constructor() { }

  onNewMarkerResponse(): Observable<any> {
    return this.ResponseSubjects.NewMarkerWebSocketResponse
  }

  onRemoveMarkerResponse(): Observable<any> {
    return this.ResponseSubjects.RemoveMarkerWebSocketResponse
  }

  onUpdateMarkerWebSocketRespose(): Observable<any> {
    return this.ResponseSubjects.UpdateMarkerWebSocketResponse
  }
  startSocket() {
    this.socket = new WebSocket('wss://localhost:5001/ws/marker')
    //this.socket = new WebSocket('ws/marker')
    this.socket.addEventListener("open", (ev => console.log("opened web socket")))
    this.socket.onmessage = (msg => {
      var response = JSON.parse(msg.data)
      //var subject =  [this.ResponseSubjects[response.responseType], response]
      this.ResponseSubjects[response.responseType].next(response)
    })
  }

  endSocket() {
    this.socket.close()
  }
}
