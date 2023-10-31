import { Module } from '@nestjs/common';
import { FindWayHttpController } from './find-way.controller';
import { GetExpectedInfoService } from './application/get.expected.info.service';
import { GetLocationInfoService } from './application/get.location.info.service';
import { KakaoPlaceFinder } from './infra/kakao.place.finder';
import { KakaoPathFinder } from './infra/kakao.path.finder';
import { BookmarkService } from './application/bookmark.service';
import { BookmarkRepository } from './infra/bookmark.repository';

const application = [GetExpectedInfoService, GetLocationInfoService, BookmarkService];
const infra = [
	{ provide: 'Bookmark', useClass: BookmarkRepository },
	{ provide: 'kakaoPlaceFinder', useClass: KakaoPlaceFinder },
	{ provide: 'kakaoPathFinder', useClass: KakaoPathFinder },
];

@Module({
	controllers: [FindWayHttpController],
	providers: [...application, ...infra],
})
export class FindWayModule {}
