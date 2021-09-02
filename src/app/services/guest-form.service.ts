import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GuestService } from './guest.service';

@Injectable({
  providedIn: 'root'
})
export class GuestFormService {
  private currentGuestTableFormSubject: BehaviorSubject<FormGroup>;
  public currentGuestTableForm: Observable<FormGroup>;

  constructor(
    private guestService: GuestService,
    private formBuilder: FormBuilder
  ) {
    this.currentGuestTableFormSubject = new BehaviorSubject<FormGroup>(
      this.formBuilder.group({
        guests: this.formBuilder.array([])
      })
    );
    this.currentGuestTableForm = this.currentGuestTableFormSubject.asObservable();
    this.updateGuestTableForm();
  }

  updateGuestTableForm() {
    const guestTableForm = this.formBuilder.group({
      guests: this.formBuilder.array([])
    });
    this.guestService.getGuestsAsFormArray().subscribe(guests => {
      guestTableForm.setControl('guests', guests);
      this.currentGuestTableFormSubject.next(guestTableForm);
    });

  }
}
