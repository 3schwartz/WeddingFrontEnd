import { Component, OnInit } from '@angular/core';
import { Guest } from 'src/app/models/guest';
import { GuestService } from 'src/app/services/guest.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss']
})
export class GuestsComponent implements OnInit {
  guests: Observable<Guest[]>;

  constructor(
    private guestService: GuestService
  ) { }

  ngOnInit(): void {
    this.guests = this.guestService.getGuestsName();
  }

}
