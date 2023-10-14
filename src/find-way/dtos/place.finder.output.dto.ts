import { PlaceFinderOutputType } from '../types/place.finder.output.type';

export type PlaceFinderOutputDto = {
  addressDocument: PlaceFinderOutputType[];
  keywordDocument: PlaceFinderOutputType[];
};
