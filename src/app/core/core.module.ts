import { NgModule } from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {HomeComponent} from './components/home/home.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { PickOfferDialogComponent } from './components/pick-offer-dialog/pick-offer-dialog.component';
import localePl from '@angular/common/locales/pl';


registerLocaleData(localePl);

@NgModule({
  declarations: [
    HomeComponent,
    NavBarComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    PickOfferDialogComponent
  ],
  exports: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([])
  ]
})
export class CoreModule { }
