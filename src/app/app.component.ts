import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryISO } from 'ngx-intl-tel-input';
import { moroccanPhoneValidator } from './Utilities/validators';

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
  phoneControlIsValid : any;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.phoneForm = this.fb.group({
      phone: ['', [Validators.required]]
    });
    this.phoneForm.get('phone')?.valueChanges.subscribe(() => {
      this.phoneControlIsValid = this.phoneForm.get('phone')?.valid;
    });
  }

  onSubmit() {
    console.log();
    console.log("--------------");
    console.log(this.phoneForm.value);
    console.log("phoneControlIsValid", this.phoneControlIsValid);
    console.log("phoneForm invalid", this.phoneForm.invalid);
  }
}
