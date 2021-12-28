import {Component, Input} from '@angular/core';
import {Book} from '../../../shared/models/book';
import {BookService} from '../../../shared/services/book.service';
import {Router} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import { debounce } from 'lodash';
import {UserService} from '../../../shared/services/user.service';
import {AdvertisementService} from '../../../shared/services/advertisement.service';
import {Advertisement} from '../../../shared/models/advertisement';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Input() data: string[] = [];
  page = 1;
  advertisements$: Observable<Advertisement[]> = new Observable<Advertisement[]>();
  value = '';
  selected = 'Wszystko';
  city = '';

  cos: Book[] = [];

  categories = ['Wszystko', 'Biografia', 'Fantastyka', 'Filozofia', 'Historia', 'Horror', 'Kryminał', 'Literatura młodzieżowa',
    'Literatura obyczajowa', 'Powieść', 'Romans', 'Science fiction'];

  constructor(private advertisementService: AdvertisementService, private router: Router, private userService: UserService) {
    this.search = debounce(this.search, 500);
  }

  search(searchText: any): void {
    if (searchText.length >= 3) {
      this.advertisements$ = this.advertisementService.searchForAdvertisement(searchText, this.userService.loggedUser.userId);
    } else {
      this.advertisements$ = EMPTY;
    }
  }

  pickBook(bookId: any): any {
    this.router.navigate([`book/${bookId}`]);
  }


}
