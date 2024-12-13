import { Injectable } from '@angular/core';
import { ICarritoItem } from './carrito-item.model';
import { IProducto } from '../productos/producto.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  // Almacen interno de los productos que los usuarios agregan al carrito de compras
  public items: ICarritoItem[] = [];

  private itemsSubject = new BehaviorSubject<ICarritoItem[]>(this.items);

  public items$ = this.itemsSubject.asObservable();

  constructor() { }

  agregarProducto(prod: IProducto, cant: number = 1) {
    console.log('agregarProducto', prod, cant);

    // Verificamos si el producto ya existe en el carrito
    const existe = this.items.find((item) => item.producto.id === prod.id);

    if (existe) {
      // Si el producto ya existe, actualizamos su cantidad
      existe.cantidad += cant;

      // Si la cantidad resulta en 0 o menos, eliminamos el producto
      if (existe.cantidad <= 0) {
        this.eliminarProducto(prod);
      } else {
        this.itemsSubject.next(this.items);
      }
    } else if (cant > 0) {
      // Si no existe y la cantidad es positiva, lo agregamos al carrito
      this.items.push({ producto: prod, cantidad: cant });
      this.itemsSubject.next(this.items);
    }
  }

  eliminarProducto(producto: IProducto) {
    this.items = this.items.filter((item) => item.producto.id !== producto.id);
    this.itemsSubject.next(this.items);
  }

  vaciarCarrito() {
    this.items = [];
    this.itemsSubject.next(this.items);
  }

  getTotal(): number {
    let total = 0.0;

    for (let item of this.items) {
      total += item.producto.price * item.cantidad;
    }
    return total;
  }
}
