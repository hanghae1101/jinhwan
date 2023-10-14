import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Bookmark } from '../entities/bookmark.entity';
import { IBookmark } from '../domain/bookmark.interface';

@Injectable()
export class BookmarkRepository
  extends Repository<Bookmark>
  implements IBookmark
{
  constructor(private dataSource: DataSource) {
    super(Bookmark, dataSource.createEntityManager());
  }

  async post(body): Promise<any> {
    const res = await this.insert(body);
    return res;
  }

  async getAll(): Promise<any> {
    const res = await this.find();
    return res;
  }
}
