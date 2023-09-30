import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class GetExpectedInfoHttpController {
  @Get()
  public getExpectedData(departure: string, arrival: string): string {
    //출빌.도착,승객 정보 받기
    //들어오는 passenger의 상태 확인(idle, request, standby, onboard)
    //idle이면 예상요금, 예상시간, 경로를 반환후 request로 상태변경
    //idle아니면 exception

    return '예상요금, 예상시간, 경로, 승객 상태를 반환';
  }
}
