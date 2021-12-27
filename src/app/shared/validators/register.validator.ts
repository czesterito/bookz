import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';


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

