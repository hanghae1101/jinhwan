import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { GetExpectedInfoService } from './application/get.expected.info.service';
import { GetLocationInfoService } from './application/get.location.info.service';
import { PlaceFinderOutputDto } from './dtos/place.finder.output.dto';
import { BookmarkService } from './application/bookmark.service';

@Controller()
export class FindWayHttpController {
	constructor(
		private readonly getExpectedInfoService: GetExpectedInfoService,
		private readonly getLocationInfoService: GetLocationInfoService,
		private readonly bookmarkService: BookmarkService
	) {}

	@Get('location-info')
	public async searchLocation(@Query('text') text: string): Promise<PlaceFinderOutputDto> {
		return await this.getLocationInfoService.getLocationList(text);
	}

	//유저 상태검증 가드만들어서 적용하기
	@Get('expected-info')
	public async getExpectedInfo(@Query('departure') departure: string, @Query('arrival') arrival: string): Promise<any> {
		const res = await this.getExpectedInfoService.getInfo(departure, arrival);
		return { data: res };
	}

	@Get('bookmark')
	public async getBookmarkList(): Promise<any> {
		const res = await this.bookmarkService.getBookmarkList();
		return res;
	}

	@Post('bookmark')
	public async postBookmarkList(@Body() body): Promise<any> {
		const res = await this.bookmarkService.postBookmark(body);
		return res;
	}

	@Delete('bookmark/:id')
	public async deleteBookmark(@Param('id') id: number): Promise<any> {
		console.log(id);
		const res = await this.bookmarkService.deleteBookmark(id);
		return res;
	}
}
