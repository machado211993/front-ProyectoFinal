import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit {
  ventas: any[] = []; // Almacena la lista de ventas
  loading: boolean = true; // Indicador de carga
  error: string | null = null; // Mensaje de error

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }
  isAdmin: boolean = false;
  ngOnInit(): void {
    this.cargarVentas();
    // Verificar si el usuario es admin
    this.isAdmin = this.authService.isAdmin();

    // Si no es admin, redirigir al login o a otro lugar
    if (!this.isAdmin) {
      this.router.navigate(['/']);
    }
  }

  cargarVentas(): void {
    this.http.get('/api/ventas').subscribe({
      next: (data: any) => {
        this.ventas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar ventas:', err);
        this.error = 'Ocurrió un error al cargar las ventas.';
        this.loading = false;
      }
    });
  }
}
