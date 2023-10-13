import { Inject, Injectable } from '@nestjs/common';
import { IBookmark } from '../domain/bookmark.interface';

@Injectable()
export class BookmarkService {
  constructor(@Inject('Bookmark') private readonly bookmark: IBookmark) {}
  async getBookmarkList(): Promise<any> {
    return this.bookmark.getAll();
  }

  async postBookmark(body): Promise<any> {
    return this.bookmark.post(body);
  }
}
