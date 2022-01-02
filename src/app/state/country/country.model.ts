import { ID } from '@datorama/akita';

export interface Country {
  _id: ID;
  name: string;
  description: string;
  isSafe: boolean;
  isFavourite: boolean;
}
