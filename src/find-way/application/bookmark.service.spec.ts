import { IBookmark } from '../domain/bookmark.interface';
import { BookmarkService } from './bookmark.service';

describe('', () => {
	let service: BookmarkService;

	class mockBookmarkRepository implements IBookmark {
		post(body: any): Promise<any> {
			return Promise.resolve('success');
		}
		getAll(): Promise<any> {
			throw new Error('Method not implemented.');
		}
		delete(id: number): Promise<any> {
			return Promise.resolve('success');
		}
	}

	it('should be created', () => {
		service = new BookmarkService(new mockBookmarkRepository());
		expect(service).toBeTruthy();
	});
});
