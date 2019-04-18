import { Component, OnInit } from '@angular/core';
import { ChatMessage, Fooditem, ChatRoomInfo, AppUser } from '../../core/models';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { map } from 'rxjs/operators';
import { ChatService } from '../chat.service';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  newChatMessage: ChatMessage = {};
  chatMessages$: Observable<ChatMessage[]>;
  chatMessage: ChatMessage[];

  currentUser: AppUser;
  order: any;

  orderId: string;

  constructor(private route: ActivatedRoute, private chatService: ChatService,
              private authService: AuthService) {
    this.orderId = route.snapshot.paramMap.get('id');
  }

  inputMessageText: string;

  scrollToBottom() {
    try {
      document.getElementById('inner').scrollTop = document.getElementById('inner').scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }

setupChatRoom($event) {
    console.log('chat message entered', this.inputMessageText);
    this.newChatMessage.message = this.inputMessageText;
    this.newChatMessage.createdByUserId = this.authService.currUser.uid;
    console.log('from setupChatRoom', this.newChatMessage);
    this.chatService.createChatMessages(this.newChatMessage, this.orderId);
  }
  getChatbyQuery() {
    this.chatMessages$ = this.chatService.getChatRoomMessages(this.orderId);
    console.log('I am at chatMessages$-', this.chatMessages$);

    this.chatMessages$.subscribe(messages => {
      console.log('new chat messages observable', messages);
      this.chatMessage = messages;
    });
  }

ngOnInit() {
    this.order = this.route.snapshot.data.order;
    this.getChatbyQuery();
}
}
