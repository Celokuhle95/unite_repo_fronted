import {Friendship} from './friendship.model';

export interface Message {

  id?: number;

  value?: string;

  date?: Date;

  senderId?: number;

  friendship?: Friendship;
}
