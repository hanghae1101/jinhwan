export type PathFinderOutputDto = {
  cost: number;
  time: number;
  distance: number;
  route: {
    name: string;
    vertexes: number[];
  }[];
};
