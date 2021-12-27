import {Component, OnInit} from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {
  createPasswordStrengthValidator,
  samePassword
} from '../../../shared/validators/register.validator';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  hide = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  form!: FormGroup;

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): any {
    this.form = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]
      ),
      password: new FormControl('', [
        Validators.required,
        createPasswordStrengthValidator()
      ]),
      samePassword: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required
      ])
    }, {
      validators: [samePassword()],
      updateOn: 'blur',
    });
  }

  get email(): any {
    return this.form.get('email');
  }

  get password(): any {
    return this.form.get('password');
  }

  get samePassword(): any {
    return this.form.get('samePassword');
  }

  get name(): any {
    return this.form.get('name');
  }

  createUser(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const data = {
        email: this.email.value.toLowerCase(),
        username: this.name.value,
        password: this.password.value
      };
      this.userService.createNewUser(data)
        .subscribe(
          (response: User) => {
            this.snackBar.open('Konto zostało założone', undefined, {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.router.navigate(['login']);
          });
    }
  }
}
