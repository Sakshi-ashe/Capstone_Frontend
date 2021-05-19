import { Book } from './book';
import { User } from './user.model';

export class Favorite {
	id :number;
	book:Book;
	user:User;
}
