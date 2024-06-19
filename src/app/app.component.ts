import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CountryISO } from 'ngx-intl-tel-input';
import { parsePhoneNumber } from 'libphonenumber-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  phoneForm!: FormGroup;
  preferredCountries: CountryISO[] = [
    CountryISO.Morocco,
    CountryISO.Algeria,
    CountryISO.Tunisia
  ];
  country: CountryISO = CountryISO.Morocco;

  numberDetails = {
    valid: false as boolean,
    internationalNumber: '' as string | null
  };

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.phoneForm = this.fb.group({
      phone: ['']
    });
    this.phoneForm.get('phone')?.valueChanges.subscribe(() => {
      const phone = this.phoneForm.get('phone')?.value;
      if (phone?.number)
      {
        console.log("phone", phone)
        const number = phone?.e164Number;
        console.log("number", number)
        const parseNumber = parsePhoneNumber(number, 'MA');
        console.log("parseNumber", parseNumber)
        this.numberDetails.valid = parseNumber.isValid();
        this.numberDetails.internationalNumber = number;
      }
      else
      {
        this.numberDetails.valid = false;
        this.numberDetails.internationalNumber = null;
      }

      if (!this.numberDetails.valid)
      {
        this.phoneForm.get('phone')?.markAsTouched();
        this.phoneForm.get('phone')?.setErrors({ invalidPhone: true });
      }
      else
      {
        this.phoneForm.get('phone')?.setErrors(null);
      }
    });

    setTimeout(() => {
      this.phoneForm.get('phone')?.setValue('+212723876788')
    }, 100);
  }

  onSubmit() {
    console.log();
    console.log("--------------");
    console.log(this.phoneForm.value.phone);
    console.log(this.phoneForm);
    console.log("errors", this.phoneForm.get('phone')?.errors);

  }
}
