import { Injectable } from '@nestjs/common';
import { RouteEntity } from '../domain/route.entity.root';

@Injectable()
export class GetExpectedInfoService {
  constructor(private readonly routeEntity: RouteEntity) {}
  async getInfo(departure: number, arrival: number): Promise<string> {
    const coordinates = this.routeEntity.getLocationInfo(departure, arrival);
    // const { cost, time, route } = this.routeEntity.getPathInfo(coordinates)

    return ''; //{ cost, time, route };
  }
}
