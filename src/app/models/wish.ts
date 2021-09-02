import { FormGroup, FormControl, Validators } from '@angular/forms';

export class Wish {
  id?: number;
  name: string;
  url?: string;
  price?: number;

  constructor(wish: Wish) {
    Object.assign(this, wish);
  }

  static asFormGroup(wish: Wish): FormGroup {
    const fg = new FormGroup({
      id: new FormControl(wish.id, Validators.required),
      name: new FormControl(wish.name, Validators.required),
      url: new FormControl(wish.url),
      price: new FormControl(wish.price)
    });
    return fg;
  }
}
