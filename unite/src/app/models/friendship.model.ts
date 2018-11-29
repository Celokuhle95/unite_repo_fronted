import {Friend} from '../models/friend.model';
import {Message} from './message.model';

export interface Friendship {

  id?: number;

  initiator?: Friend;

  acceptor?: Friend;

  messages?: Message[];
}
