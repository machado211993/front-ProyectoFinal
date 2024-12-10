export interface ProductoVenta {
  productId: number;
  productName: string;
  cantidad: number;
  precio: number;
}

export interface IVenta {
  total: number;
  userId: number;
  productos: ProductoVenta[];
}

/* 
export interface IProducto {
  id?: number | undefined;
  name: string;
  price: number;
  categoryId: number;
  score: number;
  imageUrl?: string | undefined;
}
*/