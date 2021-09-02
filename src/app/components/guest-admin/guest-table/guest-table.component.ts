import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { GuestState } from 'src/app/models/guest-state';
import { Guest } from 'src/app/models/guest';

@Component({
  selector: 'app-guest-table',
  templateUrl: './guest-table.component.html',
  styleUrls: ['./guest-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestTableComponent implements OnInit {
  displayedColumns = [
    'name',
    'email',
    'addressId',
    'guestStateId',
    'update',
    'delete'
  ];

  @Input() addresses: Address[];
  @Input() guestStates: GuestState[];
  @Input() guestTableForm: FormGroup;

  @Output() guestToAdd = new EventEmitter<Guest>();
  @Output() guestIdToDelete = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  get guestsArray(): FormArray {
    return this.guestTableForm.get('guests') as FormArray;
  }

  updateGuest(guest: FormGroup) {
    const addressToRequest = this.getAddressToRequest(guest);
    const guestStateToRequest = this.getGuestStateToRequest(guest);

    const guestToRequest = new Guest({
      id: guest.get('id').value,
      name: guest.get('name').value,
      email: guest.get('email').value,
      address: addressToRequest,
      gueststate: guestStateToRequest
    });

    this.guestToAdd.emit(guestToRequest);
  }

  deleteGuest(id: number) {
    this.guestIdToDelete.emit(id);
  }

  getAttending() {
    return this.guestsArray.controls
      .map(guest => (guest.get('guestStateId').value === 4 ? 1 : 0))
      .reduce((prev, next) => prev + next, 0);
  }

  private getGuestStateToRequest(guest: FormGroup): GuestState {
    let guestStateToRequest: GuestState;

    if (guest.get('guestStateId').value) {
      guestStateToRequest = this.guestStates.filter(
        state => state.id === guest.get('guestStateId').value
      )[0];
    } else {
      guestStateToRequest = null;
    }
    return guestStateToRequest;
  }

  private getAddressToRequest(guest: FormGroup): Address {
    let addressToRequest: Address;

    if (guest.get('addressId').value) {
      addressToRequest = this.addresses.filter(
        adds => adds.id === guest.get('addressId').value
      )[0];
    } else {
      addressToRequest = null;
    }
    return addressToRequest;
  }

  calculateRowClass(guest) {
    const value = guest.value.guestStateId;

    if (value === 1) {
      return { stdSend: true };
    }
    if (value === 2) {
      return { invSend: true };
    }
    if (value === 3) {
      return { attFalse: true };
    }
    if (value === 4) {
      return { attTrue: true };
    }
    return;
  }
}
