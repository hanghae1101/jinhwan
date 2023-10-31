import { Inject, Injectable } from '@nestjs/common';
import { IBookmark } from '../domain/bookmark.interface';
import { Bookmark } from '../../app/entity/bookmark.entity';

@Injectable()
export class BookmarkService {
	constructor(@Inject('Bookmark') private readonly bookmark: IBookmark) {}

	async getBookmarkList(): Promise<any> {
		try {
			return await this.bookmark.getAll();
		} catch (err) {
			throw new Error(err);
		}
	}

	async postBookmark(body): Promise<Bookmark> {
		try {
			return await this.bookmark.post(body);
		} catch (err) {
			throw new Error(err);
		}
	}

	async deleteBookmark(id: number): Promise<Bookmark> {
		try {
			return await this.bookmark.delete(id);
		} catch (err) {
			throw new Error(err);
		}
	}
}
