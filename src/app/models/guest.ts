import { Address } from './address';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { GuestState } from './guest-state';

export class Guest {
  id?: number;
  name: string;
  email?: string;
  address?: Address;
  gueststate?: GuestState;

  constructor(guest: Guest) {
    Object.assign(this, guest);
  }

  static asFormGroup(guest: Guest): FormGroup {
    const fg = new FormGroup({
      id: new FormControl(guest.id, Validators.required),
      name: new FormControl(guest.name, Validators.required),
      email: new FormControl(guest.email),
      addressId: new FormControl(guest.address ? guest.address.id : guest.address),
      guestStateId: new FormControl(guest.gueststate ? guest.gueststate.id : guest.gueststate)
    });
    return fg;
  }
}
