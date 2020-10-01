import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../DTO/user';
import { SignInRequest } from '../DTO/sign-in-request';
import { Response } from '../DTO/server-response';
import { SignUpRequest } from '../DTO/sign-up-request';
import { ValidateIdRequest } from '../DTO/validate-id-request';
import { AddDocumentRequest } from '../DTO/add-document-request';
import { UpdateDocumentRequest } from '../DTO/update-document-request';
import { GetDocsByOwnerIdRequest } from '../DTO/get-docs-by-owner-id-request';
import { RemoveDocumentRequest } from '../DTO/remove-document-request';
import { GetShareByDocIdRequest } from '../DTO/get-share-by-doc-id-request';
import { RemoveShareRequest } from '../DTO/remove-share-request';
import { CreateShareRequest } from '../DTO/create-share-request';
import { CreateMarkerRequest } from '../DTO/create-marker-request';
import { RemoveMarkerRequest } from '../DTO/remove-marker-request';
import { GetMarkersRequest } from '../DTO/get-markers-request';
import { UpdateMarkerRequest } from '../DTO/update-marker-request';

@Injectable({
  providedIn: 'root'
})
export abstract class CommService {
  //register
  abstract Register(request: SignUpRequest): Observable<any>
  abstract validateUserId(request: ValidateIdRequest): Observable<any>
  //login
  abstract Login(request: SignInRequest): Observable<any>
  abstract isAuthenticated(userName: string): Observable<Boolean>
  //documents
  abstract AddDocument(request: AddDocumentRequest): Observable<any>
  abstract UpdateDocument(request: UpdateDocumentRequest): Observable<any>
  abstract GetDocsByOwnerId(request: GetDocsByOwnerIdRequest): Observable<any>
  abstract RemoveDocument(request: RemoveDocumentRequest): Observable<any>
  //share
  abstract GetAllUsers(): Observable<any>
  abstract CreateShare(request: CreateShareRequest): Observable<any>
  abstract GetShareByDocId(request: GetShareByDocIdRequest): Observable<any>
  abstract RemoveShare(request: RemoveShareRequest): Observable<any>
  //markers
  abstract CreateMarker(request: CreateMarkerRequest): Observable<any>
  abstract RemoveMarker(request: RemoveMarkerRequest): Observable<any>
  abstract GetMarkers(request: GetMarkersRequest): Observable<any>
  abstract UpdateMarker(request: UpdateMarkerRequest): Observable<any>
}
