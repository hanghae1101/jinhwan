import { Inject, Injectable } from '@nestjs/common';
import { IBookmark } from '../domain/bookmark.interface';

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

  async postBookmark(body): Promise<any> {
    try {
      return await this.bookmark.post(body);
    } catch {
      throw new Error(err);
    }
  }
}
