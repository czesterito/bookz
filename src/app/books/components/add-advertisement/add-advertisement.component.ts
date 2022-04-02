import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../shared/services/user.service';
import {Book} from '../../../shared/models/book';
import {AdvertisementService} from '../../../shared/services/advertisement.service';
import {Advertisement} from '../../../shared/models/advertisement';
import {BookService} from '../../../shared/services/book.service';

@Component({
  selector: 'app-add-advertisement',
  templateUrl: './add-advertisement.component.html',
  styleUrls: ['./add-advertisement.component.css']
})
export class AddAdvertisementComponent implements OnInit {

  hide = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  form!: FormGroup;
  books: Book[] = [];

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private advertisementService: AdvertisementService,
              private router: Router, private userService: UserService, private bookService: BookService) {
    this.userService.getUserBooks(this.userService.loggedUser.userId)
      .subscribe((response: Book[]) => {
        response.forEach(book => {
          if (!book.taken) {
            this.books.push(book);
          }
        });
      });
  }

  ngOnInit(): any {
    this.form = this.fb.group({
      city: new FormControl('', [
        Validators.required
      ]),
      book: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('')
    });
  }

  get city(): any {
    return this.form.get('city');
  }

  get book(): any {
    return this.form.get('book');
  }

  get description(): any {
    return this.form.get('description');
  }



  makeAdvertisement(): void {
    const data = {
      book: this.book.value,
      city: this.city.value,
      description: this.description.value
    };
    this.advertisementService.createNewAdvertisement(data)
      .subscribe(
        () => {
          this.book.value.taken = true;
          this.bookService.updateBook(this.book.value)
            .subscribe(() => {
              this.router.navigate(['/']);
            });
        });
  }

}
