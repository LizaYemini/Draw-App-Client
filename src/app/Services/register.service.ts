import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { SharedDataService } from './shared-data.service';
import { Observable, Subject } from 'rxjs';
import { map, tap, debounceTime, take, switchMap } from 'rxjs/operators';
import { User } from '../DTO/user';
import { ValidationErrors } from '@angular/forms';
import { SignUpRequest } from '../DTO/sign-up-request';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  userName: string

  ResponseSubjects = {
    SignUpResponseOk: new Subject<any>(),
    SignUpResponseEmailExists: new Subject<any>()
  }
  AppResponseError = new Subject<any>()

  constructor(private commService: CommService, private sharedDataService: SharedDataService) {
    this.sharedDataService.currentMessage.subscribe(msg => this.userName = msg)
  }

  onError(): Subject<any> {
    return this.AppResponseError
  }
  onSignUpResponseOK(): Observable<any> {
    return this.ResponseSubjects.SignUpResponseOk
  }
  onEmailExists(): Observable<any> {
    return this.ResponseSubjects.SignUpResponseEmailExists
  }
  register(request: SignUpRequest) {
    var obs = this.commService.Register(request)
    var obs2 = obs.pipe(
      map(response => {
        if (response.responseType == "SignUpResponseOk") {
          this.sharedDataService.changeMessage(request.Id)
        }
        return [this.ResponseSubjects[response.responseType], response]
      }
      )
    )
    var subscriber = obs2.subscribe(
      ([ResponseSubject, response]) => ResponseSubject.next(response),
      error => this.onError().next(error),
      //() => console.log("Communication Completed")
    )
  }
  isAuthenticated(): Observable<Boolean> {
    return this.commService.isAuthenticated(this.userName)
  }
  /*
  return this.commService.Register(user).pipe(
    map(response => {
      if (response.status === "OK") {
        this.sharedDataService.changeMessage(user.username)
        this.userName = user.username
      }
      return response
    })
  )
  */
}

