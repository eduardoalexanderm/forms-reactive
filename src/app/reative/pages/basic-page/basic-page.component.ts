import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const rtx = {
  name: '',
  price: 0,
  inStorage: 0,
}

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.css']
})



export class BasicPageComponent implements OnInit {

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [Validators.required]),
  //   price: new FormControl(0, [Validators.required, Validators.min(0)]),
  //   inStorage: new FormControl(0, [Validators.required, Validators.min(0)]),
  // });

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm.reset(rtx);
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return ` The minimum ${errors['minlength'].requiredLength} characters`;
        case 'min':
          return 'The minimum value is 0';
      }
    }
    return null;
  }

  // getErrorMessage(field: string, error: string, value?: any): string {
  //   const config = {
  //     'name': {
  //       'required': 'The name field is required',
  //       'minlength': 'The name must have at least 3 characters',
  //     },
  //     'price': {
  //       'required': 'The price field is required',
  //       'min': 'The price must be greater than 0',
  //     },
  //     'inStorage': {
  //       'required': 'The inStorage field is required',
  //       'min': 'The inStorage must be greater than 0',
  //     },
  //   };

  //   return config[field][error];

  // }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.reset({
      price: 0,
      inStorage: 0,
    });
  }
}
