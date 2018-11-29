import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../services/message.service';
import {Message} from '../../models/message.model';
import {Friendship} from '../../models/friendship.model';
import StorageUtil from '../../util/StorageUtil';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message: string;

  chatMessages: Message[];

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.loadLatestMessages(); //to load at component load time
    this.load(); // to load at intervals for update
  }

  sendMessage(): void {
    if (this.message) {
      const friendship: Friendship = {id: StorageUtil.getFriendshipId()};
      let chat: Message = {
        value: this.message,
        senderId: StorageUtil.getCurrentUserId(),
        friendship: friendship
      };
      this.messageService.save(chat).subscribe(() => {
      }, () => {
      }, () => {
        this.loadLatestMessages();
      });
    }
  }

  /**
   * Returns a pre-set number of messages, and if the message is returned, but already shown, then that message is not shown again.
   */
  loadLatestMessages(): void {
    this.messageService.loadLatest().subscribe((messages: Message[]) => {
      messages.forEach(message => {
        if (!this.isAlreadyDisplayed(message.id)) {
          this.chatMessages.push(message);
        }
      });
    });
  }

  loadOlderMessages(): void {
  }

  private load() {
    setInterval(() => {
      this.loadLatestMessages();
    }, 15000);
  }

  private isAlreadyDisplayed(messageId: number): boolean {
    return this.chatMessages.some(message => message.id === messageId);
  }


}
