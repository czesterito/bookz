import {Component, Input} from '@angular/core';
import {Book} from '../../../shared/models/book';
import {BookService} from '../../../shared/services/book.service';
import {Router} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import { debounce } from 'lodash';
import {UserService} from '../../../shared/services/user.service';
import {AdvertisementService} from '../../../shared/services/advertisement.service';
import {Advertisement} from '../../../shared/models/advertisement';
import {map, tap} from 'rxjs/operators';


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
  city = '';
  category = '';
  searchCity = '';
  searchCategory = '';
  total = 0;

  advertisements: Advertisement[] = [];

  categories = ['', 'Biografia', 'Fantastyka', 'Filozofia', 'Historia', 'Horror', 'Kryminał', 'Literatura młodzieżowa',
    'Literatura obyczajowa', 'Powieść', 'Romans', 'Science fiction'];

  constructor(private advertisementService: AdvertisementService, private router: Router, private userService: UserService) {
    this.search = debounce(this.search, 500);
    this.advertisementService.searchForAdvertisement('', this.userService.loggedUser.userId,
      this.searchCategory, this.searchCity, this.page - 1).subscribe(rep => {
      this.advertisements = rep.content;
      this.total = rep.totalElements;
    });
  }

  search(searchText: any): void {
    if (searchText.length >= 3) {
      this.advertisements$ = this.advertisementService.searchForAdvertisement(searchText, this.userService.loggedUser.userId,
        this.searchCategory, this.searchCity, this.page - 1).pipe(
        tap(res => {
        }),
        map(res => res.content)
      );
    } else {
      this.advertisements$ = EMPTY;
    }
  }

  applyConditions(event: any, text: any, category?: any, city?: any): void {
    this.page = event;
    if (text === '') { this.value = ''; }
    if (category) {
      this.searchCategory = category;
    } else {
      this.searchCategory = '';
    }
    if (city) {
      this.searchCity = city;
    } else {
      this.searchCity = '';
    }
    this.advertisementService.searchForAdvertisement(text, this.userService.loggedUser.userId,
      this.searchCategory, this.searchCity, this.page - 1).subscribe(rep => {
      this.advertisements = rep.content;
      this.total = rep.totalElements;
    });
  }

  pickAdv(advertisementId: any): any {
    this.router.navigate([`advertisement/${advertisementId}`]);
  }


}
