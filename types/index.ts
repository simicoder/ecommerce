export type UserData = {
  email: string;
  password: string;
};

export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imgurl: string;
};

export type ProductSType = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imgurl: { en: { uploadId: string } };
};
