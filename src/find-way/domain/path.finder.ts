import { PathFinderOutputDto } from '../dtos/path.finder.output.dto';

export interface PathFinder {
  findPath(departure: string, arrival: string): Promise<PathFinderOutputDto>;
}
