import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Bookmark } from '../../entity/bookmark.entity';
import { IBookmark } from '../domain/bookmark.interface';

@Injectable()
export class BookmarkRepository extends Repository<Bookmark> implements IBookmark {
	constructor(private dataSource: DataSource) {
		super(Bookmark, dataSource.createEntityManager());
	}

	async post(body: DeepPartial<Bookmark>): Promise<Bookmark> {
		const res = await this.create(body);

		return res;
	}

	async getAll(): Promise<Bookmark[]> {
		const res = await this.find();
		console.log(res);
		return res;
	}

	async deleteOne(id: number): Promise<any> {
		const res = await this.delete(id);
		return res;
	}
}
