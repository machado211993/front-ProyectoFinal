import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { CommonModule, CurrencyPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  productos?: Array<any>;

  constructor(private productoService: ProductosService) {}

  ngOnInit(): void {
    console.log('voy a listar los productos');
    this.productoService.listar().subscribe((response) => {
      console.log('respuesta de la api', response);

      this.productos = response;
    });
  }
}
