import { Injectable } from '@nestjs/common';
import { RouteEntity } from '../domain/route.entity.root';

@Injectable()
export class SearchLocationService {
  constructor() {}
  async getAddress(keyword: string): Promise<string> {
    const addressList = await 
    // const { cost, time, route } = this.routeEntity.getPathInfo(coordinates)

    return ''; //{ cost, time, route };
  }
}
