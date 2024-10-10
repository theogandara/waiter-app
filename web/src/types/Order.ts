export type Order = {
  _id: string;
  table: string;
  status: "DONE" | "IN_PRODUTION" | "WAITING";
  products: {
    _id: string;
    quantity: number;
    product: {
      name: string;
      imagePath: string;
      price: number;
    };
  }[];
};
