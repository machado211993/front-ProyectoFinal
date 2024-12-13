import { Component } from '@angular/core';
import { CarritoService } from '../carrito/carrito.service';
import { Router } from '@angular/router';
import { FinalizarCompraService } from './finalizar-compra.service';
import { CommonModule } from '@angular/common';
import { IVenta, ProductoVenta } from './venta.model';


@Component({
  selector: 'app-finalizar-compra-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './finalizar-compra-component.component.html',
  styleUrls: ['./finalizar-compra-component.component.css']
})
export class FinalizarCompraComponentComponent {
  compraExitosa = false;

  constructor(
    public carritoService: CarritoService,
    private finalizarCompraService: FinalizarCompraService,
    private router: Router
  ) { }

  finalizarCompra() {
    const carrito: ProductoVenta[] = this.carritoService.items.map(item => ({
      productId: item.producto.id ?? 0, // Manejo seguro de undefined
      productName: item.producto.name,
      cantidad: item.cantidad,
      precio: item.producto.price
    }));

    const venta: IVenta = {
      total: this.carritoService.getTotal(),
      userId: 1,
      productos: carrito
    };

    this.finalizarCompraService.realizarCompra(venta).subscribe({

      next: () => {
        alert("Hemos registrado tu venta con el ID xxxx y te contactaremos a la brevedad. Podrás utilizar este código para realizar el seguimiento de tu compra.");
        this.carritoService.vaciarCarrito();
      },
      error: (err) => {
        console.error("Error al realizar la compra", err);
        alert("Ocurrió un error al procesar la compra. Inténtalo nuevamente.");
      }
    });

  }
}
