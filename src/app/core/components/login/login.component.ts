import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/models/user';
import {AuthService} from '../../../shared/services/auth.service';
import {errorFunction} from '../../../shared/models/app-error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hide = true;
  wrongCredentials = false;

  constructor(private router: Router, private userService: UserService, private authService: AuthService) {}

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get email(): any {
    return this.form.get('email');
  }

  get password(): any {
    return this.form.get('password');
  }

  login(): any {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.authService.login(this.email.value.toLowerCase(), this.password.value)
        .subscribe(() => {
          this.userService.getUserByEmail(this.email.value)
            .subscribe((response: User) => {
              this.userService.loggedUser = response;
              this.wrongCredentials = false;
              this.router.navigate(['/']);
            });
        }, error => {
          if (error.status === 401) {
            this.wrongCredentials = true;
          } else {
            return errorFunction(error);
          }
        });
    }

  }

}
