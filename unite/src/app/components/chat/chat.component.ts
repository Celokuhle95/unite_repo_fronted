import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from '../../services/message.service';
import {Message} from '../../models/message.model';
import {Friendship} from '../../models/friendship.model';
import StorageUtil from '../../util/StorageUtil';
import Timer = NodeJS.Timer;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  message: string;

  chatMessages: Message[] = [];

  interval: Timer;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.loadLatestMessages(); //to load at component load time
    this.load(); // to load at intervals for update
  }


  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  sendMessage(): void {
    if (this.message && this.message !== '') {
      console.log('SHOULD FIRE');
      const friendship: Friendship = {id: StorageUtil.getFriendshipId()};
      let chat: Message = {
        value: this.message,
        senderId: StorageUtil.getCurrentUserId(),
        friendship: friendship
      };
      this.messageService.save(chat).subscribe(() => {
      }, () => {
      }, () => {
        this.message = null;
        this.loadLatestMessages();
      });
    }
  }

  /**
   * Returns a pre-set number of messages, and if the message is returned, but already shown, then that message is not shown again.
   */
  loadLatestMessages(): void {
    this.messageService.loadLatest(this.getLastMessageIdGoingUp()).subscribe((messages: Message[]) => {
      console.log('Returned Messaged:', messages);
      messages.forEach(message => {
        if (!this.isAlreadyDisplayed(message.id)) {
          this.chatMessages.push(message);
        }
      });
    });
  }



  wasMessageSentByCurrentUser(message: Message): boolean {
    return message.senderId === StorageUtil.getCurrentUserId();
  }

  private load() {
    this.interval = setInterval(() => {
      this.loadLatestMessages();
    }, 10000);
  }

  private isAlreadyDisplayed(messageId: number): boolean {
    return this.chatMessages.some(message => message.id === messageId);
  }

  private getLastMessageIdGoingDown(): number {
    const lastMessage = this.chatMessages[this.chatMessages.length - 1];
    return lastMessage.id;
  }

  loadOlderMessages(): void { //scroll up functionality: to only return a few messages after the last message while scrolling up.
  }

  // still to implement, forms part of scrolling up
  private getLastMessageIdGoingUp(): number {
    return 0;
  }


}
