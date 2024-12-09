import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CarritoService } from '../carrito/carrito.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalizar-compra-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finalizar-compra-component.component.html',
  styleUrls: ['./finalizar-compra-component.component.css']
})
export class FinalizarCompraComponentComponent {
  compraExitosa = false;

  constructor(
    public carritoService: CarritoService,
    private http: HttpClient,
    private router: Router
  ) { }

  finalizarCompra() {
    const carrito = this.carritoService.items.map(item => ({
      productId: item.producto.id,
      productName: item.producto.name,
      cantidad: item.cantidad,
      precio: item.producto.price
    }));

    const venta = {
      total: this.carritoService.getTotal(),
      userId: 1, // Aquí puedes poner el ID del usuario logueado
      productos: carrito
    };

    this.http.post('/api/ventas', venta).subscribe({
      next: (response) => {
        console.log('Compra realizada exitosamente', response);
        this.compraExitosa = true;
        this.carritoService.vaciarCarrito();
        this.router.navigate(['/gracias']);  // Redirigir a una página de agradecimiento
      },
      error: (error) => {
        console.error('Error al realizar la compra', error);
        alert('Ocurrió un error al procesar la compra. Inténtalo nuevamente.');
      }
    });
  }
}
