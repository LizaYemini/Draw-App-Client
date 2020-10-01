import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { Observable, Subject } from 'rxjs';
import { SharedDataService } from './shared-data.service';
import { map } from 'rxjs/operators';
import { SignInRequest } from '../DTO/sign-in-request';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userName: string

  ResponseSubjects = {
    SignInResponseOk: new Subject<any>(),
    SignInResponseEmailNotExists: new Subject<any>()
  }
  AppResponseError = new Subject<any>()

  constructor(private commService: CommService, private sharedDataService: SharedDataService) {
    this.sharedDataService.currentMessage.subscribe(msg => {
      this.userName = msg
    })
  }

  onError(): Subject<any> {
    return this.AppResponseError
  }
  onSignInResponseOK(): Observable<any> {
    return this.ResponseSubjects.SignInResponseOk
  }
  onEmailNotExists(): Observable<any> {
    return this.ResponseSubjects.SignInResponseEmailNotExists
  }

  Login(request: SignInRequest) {
    var obs = this.commService.Login(request)
    var obs2 = obs.pipe(
      map(response => {
        if (response.responseType == "SignInResponseOk") {
          this.sharedDataService.changeMessage(request.Id)
        }
        return [this.ResponseSubjects[response.responseType], response]
      }))
    var subscriber = obs2.subscribe(
      ([ResponseSubject, response]) => ResponseSubject.next(response),
      error => this.onError().next(error),
      //() => console.log("Communication Completed")
    )
  }
  isAuthenticated(): Observable<Boolean> {
    return this.commService.isAuthenticated(this.userName)
  }
}
