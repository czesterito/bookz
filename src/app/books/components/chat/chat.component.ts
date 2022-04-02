import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OfferService} from '../../../shared/services/offer.service';
import {Offer} from '../../../shared/models/offer';
import {UserService} from '../../../shared/services/user.service';
import {MessageService} from '../../../shared/services/message.service';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit{

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  updateSubscription: Subscription;
  offerId: string;
  offer!: Offer;
  message = '';

  constructor(private route: ActivatedRoute, private offerService: OfferService, public userService: UserService,
              private messageService: MessageService) {
    this.updateSubscription = new Subscription();
    this.offerId = (this.route.snapshot.paramMap.get('id') as string);
  }

  ngOnInit(): any {
    this.offerService.getOffer(+this.offerId)
      .subscribe(response => {
        this.offer = response;
        setTimeout(() =>
          {
            this.scrollToBottom();
          },
          1);
      });
    this.updateSubscription = interval(1000).subscribe(
      () => {
        this.offerService.getOffer(+this.offerId)
          .subscribe(response => {
            this.offer = response;
          });
      }
    );
  }

  ngAfterViewInit(): any {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  send(text: any): any {
    if (text) {
      const data = {
        content: text,
        time: new Date().getTime(),
        nameUser: this.userService.loggedUser.username,
        offerId: this.offer.offerId
      };
      this.messageService.createNewMessage(data)
        .subscribe( response => {
          this.message = '';
          this.ngOnInit();
        });
    }
  }

  ngOnDestroy(): any {
    this.updateSubscription.unsubscribe();
  }

}
