import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl} from '@angular/forms';
import { GuestService } from 'src/app/services/guest.service';
import { Observable } from 'rxjs';
import { Guest } from 'src/app/models/guest';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
import { GuestFormService } from 'src/app/services/guest-form.service';

@Component({
  selector: 'app-address-admin',
  templateUrl: './address-admin.component.html',
  styleUrls: ['./address-admin.component.scss']
})
export class AddressAdminComponent implements OnInit {
  registerAddress: FormGroup;
  updateAddress: FormGroup;
  registerGuest: FormGroup;
  guests: Observable<Guest[]>;
  addresses: Observable<Address[]>;
  guestAtAddress: Guest[];

  constructor(
    private formBuilder: FormBuilder,
    private guestService: GuestService,
    private addressService: AddressService,
    private guestFormService: GuestFormService
  ) {}

  ngOnInit(): void {
    this.guests = this.guestService.getGuests();
    this.addresses = this.addressService.getAddresses();

    this.registerAddress = this.formBuilder.group({
      homeAddress: ['', [Validators.required]],
      guestsAtAdress: ['', [Validators.required]]
    });

    this.updateAddress = this.formBuilder.group({
      selectedAddress: ['', []],
      updateAddress: ['', [Validators.required]]
    });

    this.registerGuest = this.formBuilder.group({
      guestToAdd: ['', [Validators.required]]
    });
  }

  changeAddress(e) {
    this.addressService.readAddress(e.id).subscribe(
      address => {
        this.guestAtAddress = address.guests;
      }
    );
  }

  addGuestToAddress() {
    this.guestAtAddress = [...this.guestAtAddress, this.z.guestToAdd.value];
    this.resetForm(this.registerGuest, this.z);
  }

  deleteGuestFromAddress(guest: Guest) {
    this.guestAtAddress.splice(this.guestAtAddress.indexOf(guest), 1);
    this.guestAtAddress = [...this.guestAtAddress];
  }

  get f() {
    return this.registerAddress.controls;
  }
  get y() {
    return this.updateAddress.controls;
  }
  get z() {
    return this.registerGuest.controls;
  }

  private updateAddressInFront() {
    this.addresses = this.addressService.getAddresses();
  }

  addAddress(f) {
    const address = new Address(
      this.f.homeAddress.value,
      this.f.guestsAtAdress.value
    );
    this.addressService
      .create(address)
      .toPromise()
      .then(_ => {
        this.resetForm(this.registerAddress, this.f);
        this.updateAddressInFront();
        this.guestFormService.updateGuestTableForm();
      });
  }

  updateAddressInDb() {
    const address = new Address(
      this.y.updateAddress.value,
      this.guestAtAddress,
      this.y.selectedAddress.value.id
    );
    this.addressService
      .update(address)
      .toPromise()
      .then(_ => {
        this.resetForm(this.updateAddress, this.y);
        this.resetForm(this.registerGuest, this.z);
        this.updateAddressInFront();
        this.guestFormService.updateGuestTableForm();
      });
  }

  deleteAddress() {
    this.addressService
    .delete(this.y.selectedAddress.value.id)
    .toPromise()
    .then(_ => {
      this.resetForm(this.updateAddress, this.y);
      this.resetForm(this.registerGuest, this.z);
      this.updateAddressInFront();
      this.guestFormService.updateGuestTableForm();
    });
  }

  private resetForm(formGroup: FormGroup, abstractControl: { [key: string]: AbstractControl; }) {
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
