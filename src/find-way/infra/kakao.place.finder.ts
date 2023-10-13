import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PlaceFinder } from '../domain/place.finder';
import { PlaceFinderOutputDto } from '../dtos/place.finder.output.dto';

@Injectable()
export class KakaoPlaceFinder implements PlaceFinder {
  async findPlace(text: string): Promise<PlaceFinderOutputDto> {
    async function KakaoLocalAPI(searchType: string, text: string) {
      const url = `https://dapi.kakao.com/v2/local/search/${searchType}.json?analyze_type=similar&page=1&size=10&query=${text}`;
      try {
        const res = await axios
          .get(url, {
            headers: {
              Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
            },
          })
          .then((res) =>
            res.data.documents.map((obj) => {
              return {
                road_address: obj.road_address_name,
                address: obj.address_name,
                name: obj.place_name,
                x: obj.x,
                y: obj.y,
              };
            }),
          );

        return res;
      } catch (err) {
        throw new Error(err);
      }
    }

    const addressDocument = await KakaoLocalAPI('address', text);
    const keywordDocument = await KakaoLocalAPI('keyword', text);

    return { addressDocument, keywordDocument };
  }
}
