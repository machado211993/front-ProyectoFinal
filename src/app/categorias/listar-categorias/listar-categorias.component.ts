import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../categorias.service';
import { ICategoria } from '../categoria.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-categorias',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './listar-categorias.component.html',
  styleUrl: './listar-categorias.component.css'
})
/*commit nuevo*/ 
export class ListarCategoriasComponent implements OnInit {
  categorias: ICategoria[] = [];
  constructor(private categoriasService: CategoriasService) {}
  ngOnInit(): void {
    this.obtenerCategorias();
  }
  obtenerCategorias(): void {
    this.categoriasService.listar().subscribe({
      next: (data) => (this.categorias = data),
      error: (err) => console.error('Error al obtener las categorías:', err),
    });
  }
  eliminarCategoria(id: number): void {
    if (confirm('¿Está seguro de eliminar esta categoría?')) {
      this.categoriasService.eliminar(id).subscribe({
        next: () => this.obtenerCategorias(),
        error: (err) => console.error('Error al eliminar la categoría:', err),
      });
    }
  }
}
