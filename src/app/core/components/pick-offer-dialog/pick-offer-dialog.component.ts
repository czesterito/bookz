import {Component, Inject} from '@angular/core';
import {Book} from '../../../shared/models/book';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {UserService} from '../../../shared/services/user.service';
import {Offer} from '../../../shared/models/offer';
import {OfferService} from '../../../shared/services/offer.service';

@Component({
  selector: 'app-pick-offer-dialog',
  templateUrl: './pick-offer-dialog.component.html',
  styleUrls: ['./pick-offer-dialog.component.css']
})
export class PickOfferDialogComponent {

  books: Book[] = [];

  constructor(public dialogRef: MatDialogRef<PickOfferDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Offer,
              private router: Router, public userService: UserService, private offerService: OfferService) {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  pickChat(): any {
    this.router.navigate([`chat/${this.data.offerId}`]);
    this.dialogRef.close();
  }

  acceptOffer(): any {
    this.data.accepted = true;
    this.offerService.updateOffer(this.data)
      .subscribe(response => {
        this.dialogRef.close();
      });
  }

}
