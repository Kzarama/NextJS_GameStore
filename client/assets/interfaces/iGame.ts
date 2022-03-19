export interface GameInterface {
  id: string;
  url: string;
  discount: number;
  price: number;
  title: string;
  summary: string;
  video: string;
  releaseDate: string;
  screenshots: Array<{ id: string, url: string }>;
  poster: {
    url: string;
  };
};
