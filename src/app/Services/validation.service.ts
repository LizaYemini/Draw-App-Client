import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { ValidationErrors } from '@angular/forms';
import { tap, map, debounceTime, take, switchMap } from 'rxjs/operators';
import { Response } from '../DTO/server-response';
import { Observable } from 'rxjs/internal/Observable';
import { ValidateIdRequest } from '../DTO/validate-id-request';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private commService: CommService) { }

  ValidateUserId(request: ValidateIdRequest): Observable<ValidationErrors | null> {

    let commResponse = this.commService.validateUserId(request)
    let mappedCommResponse = commResponse
      .pipe(
        tap((response: Response) => console.log("Before map", response.responseType)),
        map((response: Response): ValidationErrors | null =>
          response.responseType == "SignInResponseEmailNotExists" ? null : { InvalidUser: "invalid" }
        ),
        tap((response: ValidationErrors) => console.log("after map", JSON.stringify(response)))
      )
    let retval = new Observable<ValidationErrors | null>(
      subscriber => subscriber.next()
    )

    retval = retval.pipe(
      debounceTime(4000),
      take(1),
      switchMap(value => mappedCommResponse)
    )
    return retval
  }

}


