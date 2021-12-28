import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../../shared/services/book.service';
import {Router} from '@angular/router';
import {Book} from '../../../shared/models/book';
import {UserService} from '../../../shared/services/user.service';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  hide = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  form!: FormGroup;
  categories = ['Biografia', 'Fantastyka', 'Filozofia', 'Historia', 'Horror', 'Kryminał', 'Literatura młodzieżowa',
    'Literatura obyczajowa', 'Powieść', 'Romans', 'Science fiction'];

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private bookService: BookService, private router: Router,
              private userService: UserService) {}

  ngOnInit(): any {
    this.form = this.fb.group({
      title: new FormControl('', [
          Validators.required
      ]),
      author: new FormControl('', [
        Validators.required
      ]),
      category: new FormControl('', [
        Validators.required
      ])
    });
  }

  get title(): any {
    return this.form.get('title');
  }

  get author(): any {
    return this.form.get('author');
  }

  get category(): any {
    return this.form.get('category');
  }

  addBook(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const data = {
        user: this.userService.loggedUser,
        title: this.title.value,
        author: this.author.value,
        category: this.category.value,
        taken: false
      };
      this.bookService.createNewBook(data)
        .subscribe(
          (response: Book) => {
            this.snackBar.open('Książka została dodana', undefined, {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.router.navigate(['/']);
          });
    }
  }

}
