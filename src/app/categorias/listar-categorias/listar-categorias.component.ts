import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../categorias.service';
import { ICategoria } from '../categoria.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-listar-categorias',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css']
})
export class ListarCategoriasComponent implements OnInit {
  categorias: ICategoria[] = [];
  isAdmin: boolean = false;  // Propiedad para controlar si el usuario es administrador

  constructor(
    private categoriasService: CategoriasService,
    private authService: AuthService // Servicio de autenticación
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin(); // Verifica si el usuario es administrador
    this.obtenerCategorias();
  }

  obtenerCategorias(): void {
    this.categoriasService.listar().subscribe({
      next: (data) => (this.categorias = data),
      error: (err) => console.error('Error al obtener las categorías:', err),
    });
  }

  eliminarCategoria(id: number): void {
    if (this.isAdmin && confirm('¿Está seguro de eliminar esta categoría?')) {
      this.categoriasService.eliminar(id).subscribe({
        next: () => this.obtenerCategorias(),
        error: (err) => console.error('Error al eliminar la categoría:', err),
      });
    } else {
      alert('No tienes permiso para eliminar categorías.');
    }
  }
}
