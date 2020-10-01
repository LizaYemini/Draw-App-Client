import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private massageSource = new BehaviorSubject<string>(null)
  currentMessage = this.massageSource.asObservable()
  constructor() { }
  changeMessage(message: string) {
    this.massageSource.next(message)
  }

  
  /*
  constructor() { }
  private massageSource = new BehaviorSubject<string>("admin@gmail.com")
  currentMessage = this.massageSource.asObservable()
  changeMessage(message: string) {
    this.massageSource.next(message)
  } */

}
