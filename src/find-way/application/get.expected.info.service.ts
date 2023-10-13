import { Inject, Injectable } from '@nestjs/common';
import { PathFinder } from '../domain/path.finder';
import { KakaoPathFinder } from '../infra/kakao.path.finder';

@Injectable()
export class GetExpectedInfoService {
  constructor(
    @Inject('kakaoPathFinder')
    private readonly kakaoPathFinder: PathFinder,
  ) {}
  async getInfo(departure: string, arrival: string): Promise<any> {
    const res = await this.kakaoPathFinder.findPath(departure, arrival);
    return res;
  }
}
