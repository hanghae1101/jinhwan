import { ConsoleLogger, Injectable } from '@nestjs/common';
import { PathFinder } from '../domain/path.finder';
import axios from 'axios';

@Injectable()
export class KakaoPathFinder implements PathFinder {
  constructor() {}

  async findPath(departure: string, arrival: string): Promise<any> {
    const url = `https://apis-navi.kakaomobility.com/v1/directions?origin=${departure}&destination=${arrival}&priority=RECOMMEND&summury=true`;

    const expectedRoute = await axios
      .get(url, {
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
        },
      })
      .then((res) =>
        res.data.routes.map((route) => {
          return {
            time: route.summary.duration,
            cost: route.summary.fare,
            route: [
              ...route.sections.map((section) => {
                return section.roads.map((road) => road.vertexes);
              }),
            ],
          };
        }),
      );

    return expectedRoute;
  }
}
