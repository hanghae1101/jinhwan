import { PlaceFinderOutputDto } from '../dtos/place.finder.output.dto';

export interface PlaceFinder {
  findPlace(keyword: string): Promise<PlaceFinderOutputDto>;
}
