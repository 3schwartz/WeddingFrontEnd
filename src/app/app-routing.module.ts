import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformationComponent } from './components/information/information.component';
import { GuestsComponent } from './components/guests/guests.component';
import { WishesComponent } from './components/wishes/wishes.component';
import { AddressAdminComponent } from './components/address-admin/address-admin.component';
import { GuestAdminComponent } from './components/guest-admin/guest-admin.component';
import { WishlistAdminComponent } from './components/wishlist-admin/wishlist-admin.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  {path: '', component: InformationComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent },
  {path: 'guestslist', component: GuestsComponent, canActivate: [AuthGuard]},
  {path: 'wishlist', component: WishesComponent, canActivate: [AuthGuard]},
  {path: 'addressAdmin', component: AddressAdminComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'guestAdmin', component: GuestAdminComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'wishAdmin', component: WishlistAdminComponent, canActivate: [AuthGuard, AdminGuard]},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
