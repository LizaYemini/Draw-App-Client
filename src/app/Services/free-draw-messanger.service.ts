import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FreeDrawMessangerService {

  private socket: WebSocket;
  ResponseSubjects = {
    NewLineWebSocketResponse: new Subject<any>(),
    ClearDrawingCanvasWebSocketResponse: new Subject<any>()
  }
  constructor() { }

  onNewLineResponse(): Observable<any> {
    return this.ResponseSubjects.NewLineWebSocketResponse
  }

  onClearDrawingCanvasResponse(): Observable<any> {
    return this.ResponseSubjects.ClearDrawingCanvasWebSocketResponse
  }

  startSocket() {
    this.socket = new WebSocket('wss://localhost:5001/ws/freeDraw')
    //this.socket = new WebSocket('ws/marker')
    this.socket.addEventListener("open", (ev => console.log("opened free draw web socket")))
    this.socket.onmessage = (msg => {
      var response = JSON.parse(msg.data)
      this.ResponseSubjects[response.responseType].next(response)
    })
  }

  endSocket() {
    this.socket.addEventListener("close", (ev => console.log("opened free draw web socket")))
    this.socket.close()
  }
}
