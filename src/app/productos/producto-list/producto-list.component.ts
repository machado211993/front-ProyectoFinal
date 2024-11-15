import { Component, OnInit } from '@angular/core';
import { IProducto } from '../producto.model';
import { ProductosService } from '../productos.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule],
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.css',
})
export class ProductoListComponent implements OnInit {
  productos?: Array<IProducto>;

  constructor(private productoService: ProductosService) {}

  ngOnInit(): void {
    console.log('voy a listar los productos');
    this.productoService.listar().subscribe((response) => {
      console.log('respuesta de la api', response);

      this.productos = response;
    });
  }

  onDelete(producto: IProducto): void {
    if (confirm(`¿Estás seguro de eliminar el producto ${producto.name} ?`)) {
      console.log('Eliminar producto', producto.id!);
      this.productoService.eliminar(producto.id!).subscribe((response) => {
        console.log('Producto eliminado', response);
        this.productos = this.productos?.filter((p) => p.id !== producto.id!);
      });
    } else {
      console.log('Cancelar eliminación');
    }
  }
}
