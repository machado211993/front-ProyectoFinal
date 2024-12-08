import { Component, OnInit } from '@angular/core';
import { ICategoria } from '../categoria.model';
import { CategoriasService } from '../categorias.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
/*commit nuevo*/
@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.css'
})
export class EditarCategoriaComponent implements OnInit  {
  categoria: ICategoria = { name: '' };
  esEdicion: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriasService: CategoriasService
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.esEdicion = true;
      this.categoriasService.detalle(id).subscribe({
        next: (data) => (this.categoria = data),
        error: (err) => console.error('Error al cargar la categoría:', err),
      });
    }
  }
  guardar(): void {
    if (this.esEdicion) {
      this.categoriasService.actualizar(this.categoria).subscribe({
        next: () => this.router.navigate(['/categorias']),
        error: (err) => console.error('Error al actualizar la categoría:', err),
      });
    } else {
      this.categoriasService.crear(this.categoria).subscribe({
        next: () => this.router.navigate(['/categorias']),
        error: (err) => console.error('Error al crear la categoría:', err),
      });
    }
  }
  
}
