import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import {SharedModule} from '../shared/shared.module';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookComponent } from './components/book/book.component';



@NgModule({
  declarations: [SearchComponent, AddBookComponent, BookComponent],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class BooksModule { }
