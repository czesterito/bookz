import {Component, Input} from '@angular/core';
import {Book} from '../../../shared/models/book';
import {BookService} from '../../../shared/services/book.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Input() data: string[] = [];
  page = 1;

  categories = ['Biografia', 'Fantastyka', 'Filozofia', 'Historia', 'Horror', 'Kryminał', 'Literatura młodzieżowa',
    'Literatura obyczajowa', 'Powieść', 'Romans', 'Science fiction'];

  books!: Book[];

  constructor(private bookService: BookService, private router: Router) {
    this.bookService.getAllBooks()
      .subscribe(response => {
        this.books = response;
      });
  }

  pickBook(bookId: any): any {
    this.router.navigate([`book/${bookId}`]);
  }


}
