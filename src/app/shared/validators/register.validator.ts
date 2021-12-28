import {AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {UserService} from '../services/user.service';
import {map} from 'rxjs/operators';


export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasLowerCase = /[a-z]+/.test(value);

    const hasNumeric = /[0-9]+/.test(value);

    let minLength: boolean;

    minLength = value.length >= 6;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && minLength;

    return !passwordValid ? {passwordStrength: true} : null;
  };
}

export function samePassword(): ValidationErrors {
  return (formGroup: FormGroup) => {
    const password = formGroup.get('password')?.value;
    const repeatPassword = formGroup.get('samePassword')?.value;
    if (password === '' || repeatPassword === '') {
      return null;
    } else {
      return password === repeatPassword
        ? null
        : { isSame: true };
    }
  };
}

export function emailExistsValidator(user: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return user.checkIfEmailIsTaken(control.value).pipe(
      map(isTaken => (isTaken ? { emailExists: true } : null))
    );
  };
}

export function nameExistsValidator(user: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return user.checkIfNameIsTaken(control.value).pipe(
      map(isTaken => (isTaken ? { nameExists: true } : null))
    );
  };
}
