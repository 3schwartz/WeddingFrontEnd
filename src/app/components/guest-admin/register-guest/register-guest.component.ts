import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Guest } from 'src/app/models/guest';
import { Address } from 'src/app/models/address';
import { GuestState } from 'src/app/models/guest-state';

@Component({
  selector: 'app-register-guest',
  templateUrl: './register-guest.component.html',
  styleUrls: ['./register-guest.component.scss']
})
export class RegisterGuestComponent implements OnInit {
  registerGuest: FormGroup;

  @Input() addresses: Address[];
  @Input() guestStates: GuestState[];

  @Output() guestToAdd = new EventEmitter<Guest>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerGuest = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email]],
      address: ['', []],
      gueststate: ['', []],
    });
  }

  get f() {
    return this.registerGuest.controls;
  }

  addGuest(f) {
    const addressToRequest = this.getAddressToRequest();
    const guestStateToRequest = this.getGuestStateToRequest();

    const guestToRequest = new Guest({
      name: this.f.name.value,
      email: this.f.email.value,
      address: addressToRequest,
      gueststate: guestStateToRequest
    });

    this.guestToAdd.emit(guestToRequest);
    this.resetForm(this.registerGuest, this.f);
  }

  private getAddressToRequest(): Address {
    let addressToRequest: Address;

    if (this.f.address.value) {
      addressToRequest = this.f.address.value;
    } else {
      addressToRequest = null;
    }
    return addressToRequest;
  }
  private getGuestStateToRequest(): GuestState {
    let guestStateToRequest: GuestState;

    if (this.f.gueststate.value) {
      guestStateToRequest = this.f.gueststate.value;
    } else {
      guestStateToRequest = null;
    }
    return guestStateToRequest;
  }

  private resetForm(
    formGroup: FormGroup,
    abstractControl: { [key: string]: AbstractControl }
  ) {
    formGroup.reset();
    formGroup.updateValueAndValidity();
    formGroup.markAsUntouched();
    formGroup.markAsPristine();

    let control: AbstractControl = null;
    Object.keys(abstractControl).forEach(name => {
      control = abstractControl[name];
      control.setErrors(null);
    });
    formGroup.setErrors({ invalid: true });
  }
}
