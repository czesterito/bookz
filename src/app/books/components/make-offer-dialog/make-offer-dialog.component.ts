import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Advertisement} from '../../../shared/models/advertisement';
import {Router} from '@angular/router';
import {Book} from '../../../shared/models/book';
import {UserService} from '../../../shared/services/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OfferService} from '../../../shared/services/offer.service';
import {BookService} from '../../../shared/services/book.service';

@Component({
  selector: 'app-make-offer-dialog',
  templateUrl: './make-offer-dialog.component.html',
  styleUrls: ['./make-offer-dialog.component.css']
})
export class MakeOfferDialogComponent implements OnInit{

  books: Book[] = [];
  form!: FormGroup;

  ngOnInit(): any {
    this.form = this.fb.group({
      book: new FormControl('', [
        Validators.required
      ])
    });
  }

  constructor(public dialogRef: MatDialogRef<MakeOfferDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Advertisement,
              private router: Router, private userService: UserService, private fb: FormBuilder, private offerService: OfferService,
              private bookService: BookService) {
    this.userService.getUserBooks(this.userService.loggedUser.userId)
      .subscribe((response: Book[]) => {
        response.forEach(book => {
          if (!book.taken) {
            this.books.push(book);
          }
        });
      });
  }

  get book(): any {
    return this.form.get('book');
  }

  select(chosenBook: Book): void {
    chosenBook.taken = true;
    const data = {
      book: chosenBook,
      advertisement: this.data
    };
    this.offerService.createNewOffer(data)
      .subscribe(resp => {
        this.bookService.updateBook(chosenBook)
          .subscribe(response => {
            this.dialogRef.close(true);
          });
      });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
