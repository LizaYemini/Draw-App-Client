import { Injectable, ɵConsole } from '@angular/core';
import { CommService } from './comm.service';
import { User } from '../DTO/user';
import { Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SignInRequest } from '../DTO/sign-in-request';
import { Response } from '../DTO/server-response';
import { SignUpRequest } from '../DTO/sign-up-request';
import { ValidateIdRequest } from '../DTO/validate-id-request';
import { AddDocumentRequest } from '../DTO/add-document-request';
import { UpdateDocumentRequest } from '../DTO/update-document-request';
import { GetDocsByOwnerIdRequest } from '../DTO/get-docs-by-owner-id-request';
import { RemoveDocumentRequest } from '../DTO/remove-document-request';
import { GetShareByDocIdRequest } from '../DTO/get-share-by-doc-id-request';
import { CreateShareRequest } from '../DTO/create-share-request';
import { RemoveShareRequest } from '../DTO/remove-share-request';
import { CreateMarkerRequest } from '../DTO/create-marker-request';
import { GetMarkersRequest } from '../DTO/get-markers-request';
import { RemoveMarkerRequest } from '../DTO/remove-marker-request';
import { CreateLiveWatchDocRequest } from '../DTO/LiveWatch/create-live-watch-doc-request';
import { GetWatchersOfDocRequest } from '../DTO/LiveWatch/get-watchers-of-doc-request';
import { RemoveLiveWatchDocRequest } from '../DTO/LiveWatch/remove-live-watch-doc-request';

@Injectable({
  providedIn: 'root'
})
export class RestCommService extends CommService {
  loggedInUser: User
  LoggedInUserName: string
  constructor(private http: HttpClient) {
    super();
    this.loggedInUser = new User("Liza", "Liza091995@hotmail.com")
  }
  Register(request: SignUpRequest): Observable<any> {
    return this.http.post("api/SignUp", request)
  }
  validateUserId(request: ValidateIdRequest): Observable<any> {
    return this.http.post("api/SignIn", request)
  }

  Login(request: SignInRequest): Observable<any> {
    return this.http.post("api/SignIn", request)
  }

  isAuthenticated(userName: string): Observable<Boolean> {
    return new Observable<Boolean>(userName => {
      if (this.LoggedInUserName != null) {
        userName.next(true)
      } else {
        userName.next(false)
      }
    })
  }

  UpdateDocument(request: UpdateDocumentRequest): Observable<any> {
    return this.http.post("api/UpdateDocument", request)
  }
  AddDocument(request: AddDocumentRequest): Observable<any> {
    console.log(request)
    return this.http.post("api/AddDocument", request)
  }

  GetDocsByOwnerId(request: GetDocsByOwnerIdRequest): Observable<any> {
    return this.http.post("api/GetAllDocs", request)
  }

  RemoveDocument(request: RemoveDocumentRequest): Observable<any> {
    return this.http.post("api/RemoveDocument", request)
  }

  GetAllUsers(): Observable<any> {
    return this.http.post("api/GetAllUsers", "")
  }

  CreateShare(request: CreateShareRequest): Observable<any> {
    return this.http.post("api/CreateShare", request)
  }
  RemoveShare(request: RemoveShareRequest): Observable<any> {
    return this.http.post("api/RemoveShare", request)
  }

  GetShareByDocId(request: GetShareByDocIdRequest): Observable<any> {
    return this.http.post("api/GetShareByDocId", request)
  }

  CreateMarker(request: CreateMarkerRequest): Observable<any> {
    console.log(request)
    return this.http.post("api/CreateMarker", request)
  }
  RemoveMarker(request: RemoveMarkerRequest): Observable<any> {
    return this.http.post("api/RemoveMarker", request)
  }
  GetMarkers(request: GetMarkersRequest): Observable<any> {
    return this.http.post("api/GetMarkers", request)
  }

  UpdateMarker(request: CreateMarkerRequest): Observable<any> {
    return this.http.post("api/UpdateMarker", request)
  }

  CreateLiveWatchDoc(request: CreateLiveWatchDocRequest): Observable<any> {
    return this.http.post("api/CurrentlyWatching/CreateLiveWatchDoc", request);
  }
  RemoveLiveWatchDoc(request: RemoveLiveWatchDocRequest): Observable<any> {
    return this.http.post("api/CurrentlyWatching/RemoveLiveWatchDoc", request);
  }
  GetWatchersOfDoc(request: GetWatchersOfDocRequest): Observable<any> {
    return this.http.post("api/CurrentlyWatching/GetWatchersOfDoc", request);
  }
}
