import { Component, Input } from '@angular/core';
import { IProducto } from '../../producto.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarritoService } from '../../../carrito/carrito.service';

@Component({
  selector: 'app-producto-grilla-item[producto]',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FontAwesomeModule],
  templateUrl: './producto-grilla-item.component.html',
  styleUrl: './producto-grilla-item.component.css',
})
export class ProductoGrillaItemComponent {
  @Input() producto!: IProducto;

  faCartShopping = faCartShopping;

  constructor(private carritoService: CarritoService) {}

  agregarAlCarrito(producto: IProducto) {
    this.carritoService.agregarProducto(producto);
  }
}
