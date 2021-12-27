import {Component, Input} from '@angular/core';
import {Book} from '../../../shared/models/book';

export interface PeriodicElement {
  owner: string;
  name: string;
  author: string;
  category: string;
  condition: string;
  city: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {owner: 'Janek', name: 'Nazwa', author: 'Autor', category: 'Powieść', condition: 'Zły', city: 'Wrocław'},
];

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  @Input() data: string[] = [];
  page = 1;

  // books: Book[] = [new Book(1, 'Księga niepokoju Bernarda Soaresa, pomocnika księgowego w Lizbonie',
  //   'Pessoa Fernando ', 'Filozofia', 'Nowa', 'Wrocław')];

  displayedColumnsExchange: string[] = ['owner', 'name', 'author', 'category', 'condition', 'city'];
  displayedColumnsBooks: string[] = ['name', 'author', 'category', 'condition', 'city'];
  dataSource = ELEMENT_DATA;

}
