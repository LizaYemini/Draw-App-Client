import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommService } from './Services/comm.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { EditDocumentComponent } from './edit-document/edit-document.component';
import { HttpClientModule } from '@angular/common/http';
import { RestCommService } from './Services/rest-comm.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DrawingComponent } from './drawing/drawing.component';
import { DocumentsListComponent } from './documents-list/documents-list.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ShareDocsComponent } from './share-docs/share-docs.component';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorChromeModule } from 'ngx-color/chrome';
import { MarkersListComponent } from './markers-list/markers-list.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EditDocumentComponent,
    DrawingComponent,
    DocumentsListComponent,
    ConfirmationDialogComponent,
    ShareDocsComponent,
    MarkersListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSelectModule,
    FontAwesomeModule,
    MatCardModule,
    CdkScrollableModule,
    NgbModule,
    ColorSketchModule,
    ColorChromeModule,
    PerfectScrollbarModule
  ],
  providers: [{ provide: CommService, useClass: RestCommService },
  {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
