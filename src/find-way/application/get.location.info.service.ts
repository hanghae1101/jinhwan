import { Inject, Injectable } from '@nestjs/common';
import { KakaoPlaceFinder } from '../infra/kakao.place.finder';
import { PlaceFinderOutputDto } from '../dtos/place.finder.output.dto';
import { PlaceFinder } from '../domain/place.finder';

@Injectable()
export class GetLocationInfoService {
  constructor(
    @Inject('kakaoPlaceFinder')
    private readonly kakaoPlaceFinder: PlaceFinder,
  ) {}

  async getLocationList(text: string): Promise<PlaceFinderOutputDto> {
    const res = await this.kakaoPlaceFinder.findPlace(text);
    return res;
  }
}
