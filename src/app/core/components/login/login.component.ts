import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hide = true;

  constructor(private router: Router, private userService: UserService) {}

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
      this.userService.getUserByEmail(this.email.value)
        .subscribe((response: User) => {
          this.userService.loggedUser = response;
          this.router.navigate(['/']);
        }, error => {
          this.userService.getUserByName(this.email.value)
            .subscribe((response: User) => {
              this.userService.loggedUser = response;
              this.router.navigate(['/']);
            });
        });
    }

  }

}
