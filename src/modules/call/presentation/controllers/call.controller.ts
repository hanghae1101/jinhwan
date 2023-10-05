import { Controller, Get, Put, Query } from '@nestjs/common';
import { GetExpectedInfoService } from '../../application/get.expected.info.service';

@Controller()
export class CallHttpController {
  constructor(
    private readonly getExpectedInfoService: GetExpectedInfoService,
  ) {}
  @Put()
  Call(departure: string, arrival: string, passenger: string): string {
    return '';
  }

  //유저 상태검증 가드만들어서 적용하기
  @Get()
  public async getExpectedInfo(
    @Query('departure') departure: number,
    @Query('arrival') arrival: number,
  ): Promise<any> {
    const res = await this.getExpectedInfoService.getInfo(departure, arrival);
    //출빌.도착,승객 정보 받기
    //들어오는 passenger의 상태 확인(idle, request, standby, onboard)
    //idle이면 예상요금, 예상시간, 경로를 반환후 request로 상태변경
    //idle아니면 exception

    return { data: res };
  }
}
