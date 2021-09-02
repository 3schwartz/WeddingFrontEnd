import { Component, OnInit } from '@angular/core';
import { WishService } from 'src/app/services/wish.service';
import { Observable } from 'rxjs';
import { Wish } from 'src/app/models/wish';

@Component({
  selector: 'app-wishes',
  templateUrl: './wishes.component.html',
  styleUrls: ['./wishes.component.scss']
})
export class WishesComponent implements OnInit {
  wishes: Observable<Wish[]>;

  displayedColumns = [
    'name',
    'comment',
    // 'price',
  ];

  constructor(
    private wishService: WishService
  ) { }

  ngOnInit(): void {
    this.wishes = this.wishService.getWishes();
  }

}
