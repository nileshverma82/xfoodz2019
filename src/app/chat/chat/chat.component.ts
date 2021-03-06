import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { AppUser, ChatMessage } from '../../core/models';
import { ChatService } from '../chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  newChatMessage: ChatMessage = null;
  chatMessages$: Observable<ChatMessage[]>;
  chatMessage: ChatMessage[];

  currentUser: AppUser;
  order: any;

  orderId: string;
  notMe;

  constructor(private route: ActivatedRoute, private chatService: ChatService,
              public authService: AuthService) {
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

  setupChatRoom() {
    console.log('chat message entered', this.inputMessageText);
    this.newChatMessage.message = this.inputMessageText;
    this.newChatMessage.createdByUserId = this.authService.currUser.uid;
    console.log('from setupChatRoom', this.newChatMessage);
    this.chatService.createChatMessages(this.newChatMessage, this.orderId);
    this.inputMessageText = '';
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
