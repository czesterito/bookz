import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import {SharedModule} from '../shared/shared.module';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookComponent } from './components/book/book.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { AddAdvertisementComponent } from './components/add-advertisement/add-advertisement.component';
import {FormsModule} from '@angular/forms';
import { MakeOfferDialogComponent } from './components/make-offer-dialog/make-offer-dialog.component';
import { ChatComponent } from './components/chat/chat.component';



@NgModule({
  declarations: [SearchComponent, AddBookComponent, BookComponent, AdvertisementComponent, AddAdvertisementComponent,
    MakeOfferDialogComponent,
    ChatComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class BooksModule { }
