import { AbstractControl, ValidatorFn } from '@angular/forms';

export function moroccanPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phoneNumber = control.value;
    const isValid = /^(\+?212|0?212|212)?7{1}2\d{7}$/.test(phoneNumber);
    return isValid ? null : { 'moroccanPhoneInvalid': { value: phoneNumber } };
  };
}
