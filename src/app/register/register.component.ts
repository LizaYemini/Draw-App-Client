import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { RegisterService } from '../Services/register.service';
import { ValidationService } from '../Services/validation.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  registerMsg: string = ""
  errorMsg: string = ""
  constructor(private registerService: RegisterService, private validationService: ValidationService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        name: new FormControl,
        username: new FormControl('', [Validators.required, Validators.email], this.ValidateMailInServer().bind(this))
        /*username: new FormControl(null, [Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"), Validators.email]),
      }, */
      })
    this.SubscribeOnSubjects()
  }


  SubscribeOnSubjects() {
    this.registerService.onSignUpResponseOK().subscribe(
      //Todo Navigate to user documents
      response => {
        this.router.navigate(['/edit-document'])
      }

    )


    this.registerService.onEmailExists().subscribe(
      response => {
        this.errorMsg = ("Email exists, please try again")
      }
    )

    this.registerService.onError().subscribe
      (
        //Todo Navigate to exit page
        message => {
          this.errorMsg = message
          console.log("Error", message)
        }
      )

  }

  onSubmit() {
    var userForm = this.registerForm.value
    this.registerService.register({ Id: userForm.username, Name: userForm.name })
  }

  ValidateMailInServer(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      var retval = this.validationService.ValidateUserId({ Id: control.value })
      return retval


    }
  }

  get username() { return this.registerForm.get('username'); }

}
