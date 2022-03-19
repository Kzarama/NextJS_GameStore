export interface ProductInterface {
  id: string;
  url: string;
  title: string;
  price: number;
  platform: {
    title: string;
  };
  poster: {
    url: string;
  };
};
