import { Injectable } from '@nestjs/common';
import axios from 'axios';
//도메인 레이어는 인터페이스로 작성하기
@Injectable()
export class RouteEntity {
  //여기에 변수 선언하기

  async getLocationInfo(departure: number, arrival: number): Promise<any> {
    console.log(departure);
    console.log(process.env.KAKAO_REST_API_KEY);
    const res = await axios;
    // .get(
    //   `https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&page=1&size=10&query=${departure}`,
    //   {
    //     headers: {
    //       Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
    //     },
    //   },
    // )
    // .then((res) => res.data)
    // .catch((err) => {
    //   throw new Error(err);
    // });
    console.log(res);
    return res;
  }
  async getPathInfo(coordinates: string): Promise<string> {
    return '';
  }
}
