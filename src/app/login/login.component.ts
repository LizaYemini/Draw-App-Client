import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loggedIn: boolean = false
  errorMsg: string = ""
  userName: string

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        username: new FormControl("")
      }
    )

    this.SubscribeOnSubjects()
  }


  SubscribeOnSubjects() {
    this.loginService.onSignInResponseOK().subscribe(
      response => {
        this.router.navigate(['/edit-document'])
      }

    )


    this.loginService.onEmailNotExists().subscribe(
      response => {
        this.errorMsg = ("Email Doe's not exists, please try again")
      }
    )

    this.loginService.onError().subscribe
      (
        //Todo Navigate to exit page
        message => {
          this.errorMsg = message.message
        }
      )
  }
  onSubmit() {
    this.loginService.Login({ Id: this.loginForm.value.username })
  }


}
