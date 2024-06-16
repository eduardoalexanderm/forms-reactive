import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.css']
})
export class DynamicPageComponent {

  // public myForm2: FormGroup = new FormGroup({
  //   favoriteGames: new FormArray([]),
  // });

  public newFavorite: FormControl = new FormControl('', Validators.required);

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear Solid', Validators.required],
      ['The Legend of Zelda', Validators.required],
      ['Final Fantasy', Validators.required],
    ]),
  });

  constructor(private fb: FormBuilder) { }

  get favoriteGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray;
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

  isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  onDeleteFavoriteGame(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  onAddFavoriteGame(): void {
    if (this.newFavorite.invalid) {
      return;
    }

    const newGame = this.newFavorite.value;
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));

    this.newFavorite.reset();
  }


  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    // this.favoriteGames.clear();
    this.myForm.controls['favoriteGames'] = this.fb.array([]);
    // reset the form
    this.myForm.reset();
  }

}
