import { Component, Input, OnInit } from '@angular/core';
import { IProducto } from '../../producto.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { faCartShopping, faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarritoService } from '../../../carrito/carrito.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarRatingModule } from 'ngx-bar-rating';


@Component({
  selector: 'app-producto-grilla-item[producto]',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FontAwesomeModule, ReactiveFormsModule, BarRatingModule, FormsModule],
  templateUrl: './producto-grilla-item.component.html',
  styleUrl: './producto-grilla-item.component.css',
})
export class ProductoGrillaItemComponent implements OnInit {
  @Input() producto!: IProducto;
  estoyEnCarrito = false;
  cantidad = 0;

  faCartShopping = faCartShopping;
  faTrash = faTrash;
  faMinus = faMinus; // Icono para el botón de menos
  faPlus = faPlus;   // Icono para el botón de más

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.carritoService.items$.subscribe((items) => {
      const item = items.find((item) => item.producto.id === this.producto.id);

      if (item !== undefined) {
        this.cantidad = item.cantidad;
        this.estoyEnCarrito = true;
      } else {
        this.cantidad = 0;
        this.estoyEnCarrito = false;
      }
      console.log('el carrito tiene', items);

    });
  }

  agregarAlCarrito(producto: IProducto) {
    this.carritoService.agregarProducto(producto);
  }

  quitarDelCarrito(producto: IProducto) {
    this.carritoService.eliminarProducto(producto);
  }

  incrementarCantidad() {
    this.cantidad++;
    this.carritoService.agregarProducto(this.producto, 1); // Aumentar la cantidad en 1
  }

  decrementarCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
      this.carritoService.agregarProducto(this.producto, -1); // Disminuir la cantidad en 1
    } else if (this.cantidad === 1) {
      this.quitarDelCarrito(this.producto); // Eliminar del carrito si la cantidad llega a 0
    }
  }
  abrirModal(imagenUrl: string) {
    const modalImage = document.getElementById('zoomImg') as HTMLImageElement;
    modalImage.src = imagenUrl;
  }

  actualizarValoracion(): void {
    // Lógica para actualizar la valoración del producto
    console.log(`Nueva valoración: ${this.producto.score}`);
    // Aquí puedes hacer una llamada al servidor si es necesario
  }



}
