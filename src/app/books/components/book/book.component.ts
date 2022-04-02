import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdvertisementService} from '../../../shared/services/advertisement.service';
import {Advertisement} from '../../../shared/models/advertisement';
import {MatDialog} from '@angular/material/dialog';
import {MakeOfferDialogComponent} from '../make-offer-dialog/make-offer-dialog.component';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  @ViewChild('textbox') textBox!: ElementRef;
  descriptionChange = false;
  description = '';

  advertisementId: string;
  advertisement!: Advertisement;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private route: ActivatedRoute, private advertisementService: AdvertisementService, public dialog: MatDialog,
              private snackBar: MatSnackBar, public userService: UserService) {
    this.advertisementId = (this.route.snapshot.paramMap.get('id') as string);
    this.advertisementService.getAdvertisement(+this.advertisementId)
      .subscribe(response => {
        this.advertisement = response;
        this.description = this.advertisement.description;
      });
  }

  makeOffer(): void {
    const dialogRef = this.dialog.open(MakeOfferDialogComponent, {
      data: this.advertisement
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Oferta została wystawiona', undefined, {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }

  changeDescription(evt: any): void {
    this.descriptionChange = !this.descriptionChange;
    setTimeout(() => {
      this.textBox.nativeElement.focus();
    }, 0);
    if (evt.target.value !== '' && evt.target.value !== undefined) {
      this.advertisementService.changeDescription(this.advertisement.advertisementId, evt.target.value)
        .subscribe( () => {});
      this.description = evt.target.value;
      evt.target.hidden = true;
    }
  }
}
