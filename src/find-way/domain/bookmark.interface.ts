import { Bookmark } from '../entities/bookmark.entity';

export interface IBookmark {
	post(body: Bookmark): Promise<any>;

	getAll(): Promise<any>;

	delete(id: number): Promise<any>;
}
