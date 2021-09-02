import { Component, OnInit } from '@angular/core';
import { WishService } from 'src/app/services/wish.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
  FormControl
} from '@angular/forms';
import { Wish } from 'src/app/models/wish';

@Component({
  selector: 'app-wishlist-admin',
  templateUrl: './wishlist-admin.component.html',
  styleUrls: ['./wishlist-admin.component.scss']
})
export class WishlistAdminComponent implements OnInit {
  wishTableForm: FormGroup;
  registerWish: FormGroup;

  displayedColumns = [
    'name',
    'url',
    'price',
    'update',
    'delete'
  ];

  constructor(
    private wishService: WishService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.updateWishesInFront();

    this.registerWish = this.formBuilder.group({
      name: ['', [Validators.required]],
      url: ['', []],
      price: ['', []]
    });
  }

  private async updateWishesInFront() {
    this.wishTableForm = this.formBuilder.group({
      wishes: this.formBuilder.array([])
    });
    this.wishService.getWishesAsFormArray().subscribe(wishes => {
      this.wishTableForm.setControl('wishes', wishes);
    });
  }

  get f() {
    return this.registerWish.controls;
  }

  get wishes(): FormArray {
    return this.wishTableForm.get('wishes') as FormArray;
  }

  addWish(f: FormGroup) {
    const wishToRequest = new Wish({
      name: this.f.name.value,
      url: this.f.url.value,
      price: this.f.price.value
    });

    this.wishService
      .create(wishToRequest)
      .toPromise()
      .then(_ => {
        this.resetForm(this.registerWish, this.f);
        this.updateWishesInFront();
      });
  }

  updateWish(event, wish: FormGroup) {
    const wishToRequest = new Wish({
      id: wish.get('id').value,
      name: wish.get('name').value,
      url: wish.get('url').value,
      price: wish.get('price').value
    });

    this.wishService
      .update(wishToRequest)
      .toPromise()
      .then(_ => {
        this.updateWishesInFront();
      });
  }

  deleteWish(id: number) {
    this.wishService
      .delete(id)
      .toPromise()
      .then(_ => {
        this.updateWishesInFront();
      });
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
