import {Component, OnInit} from '@angular/core';
import {Friend} from '../../../models/friend.model';
import {FriendshipService} from '../../../services/friendship.service';
import LocalStorageUtil from '../../../util/StorageUtil';
import {Friendship} from '../../../models/friendship.model';
import {Message} from 'primeng/api';
import {FriendService} from '../../../services/friend.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  friends: Friend[] = [];

  growlMessages: Message[] = [];

  displayAddFriendDialog: boolean;

  cellphoneOfToAddFriend: string;

  constructor(private friendService: FriendService, private friendshipService: FriendshipService, private router: Router) {
  }

  ngOnInit() {
    this.getFriends();
  }

  addFriend() {
    this.friendService.getFriendIdByCellphone(this.cellphoneOfToAddFriend).subscribe((friendId: number) => {
      if (friendId) {
        const initiator: Friend = {id: LocalStorageUtil.getCurrentUserId()};
        const acceptor: Friend = {id: friendId};
        const friendShip: Friendship = {acceptor: acceptor, initiator: initiator};
        this.friendService.save(friendShip).subscribe(() => {
          this.getFriends();
        }, error => {
          this.growlMessages.push({severity: 'danger', summary: 'Something went wrong'});
        });
      } else {
        this.growlMessages.push({severity: 'danger', summary: 'This number is not registered with Unite'});
      }
    });
  }

  connectAndStartChat(event): void {
    const selectedFriend: Friend = event.data;
    this.friendshipService.getFriendshipIdByParticipatorsIds(selectedFriend.id).subscribe((friendshipId: number) => {
      LocalStorageUtil.setFriendshipId(friendshipId);
      this.router.navigateByUrl('/chat');
    });
  }

  getFriends(): void {
    this.friendService.getFriendsByCurrentUserId().subscribe((friends: Friend[]) => {
      this.friends = friends;
    });
  }

  showDialog() {
    this.displayAddFriendDialog = true;
  }

  hideDialog() {
    this.displayAddFriendDialog = true;
  }

}
