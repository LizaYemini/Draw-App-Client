import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkerMessangerService {
  private socket: WebSocket;
  ResponseSubjects = {
    NewMarkerWebSocketResponse: new Subject<any>(),
    RemoveMarkerWebSocketResponse: new Subject<any>()
  }
  constructor() { }

  onNewMarkerResponse(): Observable<any> {
    return this.ResponseSubjects.NewMarkerWebSocketResponse
  }

  onRemoveMarkerResponse(): Observable<any> {
    return this.ResponseSubjects.RemoveMarkerWebSocketResponse
  }

  startSocket() {
    this.socket = new WebSocket('wss://localhost:5001/ws/marker')
    this.socket.addEventListener("open", (ev => console.log("opened web socket")))
    this.socket.onmessage = (msg => {
      var response = JSON.parse(msg.data)
      console.log(msg)
      console.log(JSON.parse(msg.data))
      console.log(response.responseType)
      //var subject =  [this.ResponseSubjects[response.responseType], response]
      this.ResponseSubjects[response.responseType].next(response)
    })
  }

  endSocket() {
    this.socket.close()
  }

  /*
  sendAllNewMarker() {
    this.socket.send('hello')
  }*/

  /*
  var obs = this.commService.GetMarkers(request)
var obs2 = obs.pipe(
  map(response => {
    return [this.ResponseSubjects[response.responseType], response]
  }))

var subscriber = obs2.subscribe(
  ([ResponseSubject, response]) => ResponseSubject.next(response),
  error => this.onError().next(error),
  //() => console.log("Communication Completed")
) */

}
