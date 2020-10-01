import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RegGuardService } from './Services/guards.service';
import { HomeComponent } from './home/home.component';
import { EditDocumentComponent } from './edit-document/edit-document.component';
import { DocumentsListComponent } from './documents-list/documents-list.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "edit-document", component: EditDocumentComponent },
  { path: "documents-list", component: DocumentsListComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
