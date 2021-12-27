import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './components/home/home.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';




@NgModule({
  declarations: [
    HomeComponent,
    NavBarComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent
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
