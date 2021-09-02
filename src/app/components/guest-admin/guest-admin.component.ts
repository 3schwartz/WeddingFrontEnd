import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Guest } from 'src/app/models/guest';
import { GuestService } from 'src/app/services/guest.service';
import { FormGroup } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';
import { Address } from 'src/app/models/address';
import { GuestState } from 'src/app/models/guest-state';
import { GuestStateService } from 'src/app/services/guest-state.service';
import { GuestFormService } from 'src/app/services/guest-form.service';

@Component({
  selector: 'app-guest-admin',
  templateUrl: './guest-admin.component.html',
  styleUrls: ['./guest-admin.component.scss']
})
export class GuestAdminComponent implements OnInit {
  guestTableForm: FormGroup;
  addresses: Address[];
  addresses$: Observable<Address[]>;
  guestStates$: Observable<GuestState[]>;

  constructor(
    private guestService: GuestService,
    private addressService: AddressService,
    private guestStateService: GuestStateService,
    private guestFormService: GuestFormService,
  ) {}

  ngOnInit(): void {
    this.addresses$ = this.addressService.getAddresses();
    this.guestStates$ = this.guestStateService.getGuestStates();
    this.guestFormService.currentGuestTableForm.subscribe(
      guestTableForm => this.guestTableForm = guestTableForm
    );
  }

  addGuest(guest: Guest) {
    this.guestService
      .create(guest)
      .toPromise()
      .then(_ => {
        this.guestFormService.updateGuestTableForm();
      });
  }

  updateGuest(guest: Guest) {
    this.guestService
      .update(guest)
      .toPromise()
      .then(_ => {
        this.guestFormService.updateGuestTableForm();
      });
  }

  deleteGuest(id: number) {
    this.guestService
      .delete(id)
      .toPromise()
      .then(_ => {
        this.guestFormService.updateGuestTableForm();
      });
  }

  getGuestListAsCsv() {
    this.guestService.export();
  }
}
