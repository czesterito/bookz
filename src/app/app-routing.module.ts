import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './core/components/register/register.component';
import {LoginComponent} from './core/components/login/login.component';
import {HomeComponent} from './core/components/home/home.component';
import {SearchComponent} from './books/components/search/search.component';
import {AddBookComponent} from './books/components/add-book/add-book.component';
import {ProfileComponent} from './core/components/profile/profile.component';
import {BookComponent} from './books/components/book/book.component';
import {AuthGuard} from './shared/guard/auth.guard';

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
    path: 'book/:id',
    component: BookComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
