import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './core/components/register/register.component';
import {LoginComponent} from './core/components/login/login.component';
import {HomeComponent} from './core/components/home/home.component';
import {SearchComponent} from './books/components/search/search.component';
import {AddBookComponent} from './books/components/add-book/add-book.component';
import {ProfileComponent} from './core/components/profile/profile.component';
import {AuthGuard} from './shared/guard/auth.guard';
import {AddAdvertisementComponent} from './books/components/add-advertisement/add-advertisement.component';
import {BookComponent} from './books/components/book/book.component';
import {ChatComponent} from './books/components/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddBookComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'makead',
    component: AddAdvertisementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'advertisement/:id',
    component: BookComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat/:id',
    component: ChatComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
