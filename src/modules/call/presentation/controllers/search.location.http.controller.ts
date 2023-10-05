import { Controller, Get, Query } from '@nestjs/common';
import { SearchLocationService } from '../../application/search.location';

@Controller('search-location')
export class GetExpectedInfoHttpController {
  constructor(private readonly searchLocationService: SearchLocationService) {}
  //유저 상태검증 가드만들어서 적용하기
  @Get()
  public async getExpectedInfo(
    @Query('keyword') keyword: string,
  ): Promise<any> {
    const res = await this.searchLocationService.getAddress(keyword);

    return { data: res };
  }
}
