import {Component, Input, OnInit} from '@angular/core';
import {BookService} from '../../../shared/services/book.service';
import {Book} from '../../../shared/models/book';
import {UserService} from '../../../shared/services/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {AdvertisementService} from '../../../shared/services/advertisement.service';
import {Advertisement} from '../../../shared/models/advertisement';
import {OfferService} from '../../../shared/services/offer.service';
import {Offer} from '../../../shared/models/offer';
import {MakeOfferDialogComponent} from '../../../books/components/make-offer-dialog/make-offer-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {PickOfferDialogComponent} from '../pick-offer-dialog/pick-offer-dialog.component';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {createPasswordStrengthValidator, emailExistsValidator, nameExistsValidator, samePassword} from '../../../shared/validators/register.validator';
import {User} from '../../../shared/models/user';
import {AuthService} from '../../../shared/services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  @Input() data: string[] = [];
  page = 1;

  dataSourceBook: MatTableDataSource<Book> = new MatTableDataSource();
  dataSourceAdvertisement: MatTableDataSource<Advertisement> = new MatTableDataSource();
  dataSourceOffer: MatTableDataSource<Offer> = new MatTableDataSource();
  form!: FormGroup;
  passwordForm!: FormGroup;

  displayedColumnsOffers: string[] = ['title', 'author', 'category', 'owner', 'accepted', 'delete'];
  displayedColumnsAdvertisements: string[] = ['title', 'author', 'category', 'delete'];
  displayedColumnsBooks: string[] = ['title', 'author', 'category', 'inUse', 'delete'];

  ngOnInit(): any {
    this.userService.getUserBooks(this.userService.loggedUser.userId)
      .subscribe(response => {
        this.dataSourceBook = new MatTableDataSource<Book> (response);
      });
    this.advertisementService.getUserAdvertisements(this.userService.loggedUser.userId)
      .subscribe(response => {
        this.dataSourceAdvertisement = new MatTableDataSource<Advertisement> (response);
      });
    this.offerService.getUserOffers(this.userService.loggedUser.userId)
      .subscribe(response => {
        this.dataSourceOffer = new MatTableDataSource<Offer> (response);
      });
    this.form = this.fb.group({
      email: new FormControl(`${this.userService.loggedUser.email}`, [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ],
        emailExistsValidator(this.userService)
      ),
      name: new FormControl(`${this.userService.loggedUser.username}`, [
          Validators.required
        ],
        nameExistsValidator(this.userService)
      ),
    }, {
      updateOn: 'blur',
    });

    this.passwordForm = this.fb.group({
      password: new FormControl('', [
      Validators.required,
      createPasswordStrengthValidator()
    ]),
      samePassword: new FormControl('', [
      Validators.required
    ]),
      oldPassword: new FormControl('', [
        Validators.required
      ]),
    }, {
      validators: [samePassword()],
      updateOn: 'blur'
    });
  }

  constructor(public userService: UserService, public dialog: MatDialog, private advertisementService: AdvertisementService,
              private offerService: OfferService, private bookService: BookService, private router: Router, private fb: FormBuilder,
              private authService: AuthService) {
  }

  get email(): any {
    return this.form.get('email');
  }

  get name(): any {
    return this.form.get('name');
  }

  get oldPassword(): any {
    return this.passwordForm.get('oldPassword');
  }

  get password(): any {
    return this.passwordForm.get('password');
  }

  get samePassword(): any {
    return this.passwordForm.get('samePassword');
  }

  pickOffer(offer: any): void {
    const dialogRef = this.dialog.open(PickOfferDialogComponent, {
      data: offer
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  goToBook(id: any): any {
    this.router.navigate([`advertisement/${id}`]);
  }

  deleteBook(book: Book): any {
    this.bookService.deleteBook(book.bookId)
      .subscribe(response => {
        this.ngOnInit();
      });
  }

  deleteAdv(adv: Advertisement): any {
    this.advertisementService.deleteAdvertisement(adv.advertisementId)
      .subscribe(response => {
        this.ngOnInit();
      });
  }

  deleteOffer(offer: Offer): any {
    this.offerService.deleteOffer(offer.offerId)
      .subscribe(response => {
        this.ngOnInit();
      });
  }

  updateUserNameEmail(): any {
      const user: User = this.userService.loggedUser;
      user.email = this.email.value;
      user.username = this.name.value;
      this.userService.updateUser(user)
        .subscribe(response => {
          this.userService.loggedUser = response;
          this.ngOnInit();
        });
  }
}
