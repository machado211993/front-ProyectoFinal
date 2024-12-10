import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVenta } from './venta.model';

@Injectable({
  providedIn: 'root'
})
export class FinalizarCompraService {
  private apiUrl = '/api'; // Cambia esto si tienes una URL distinta

  constructor(private http: HttpClient) { }

  realizarCompra(venta: IVenta): Observable<IVenta> {
    return this.http.post<IVenta>(`${this.apiUrl}/Ventas`, venta);
  }
  /*  crear(producto: IProducto): Observable<IProducto> {
    return this.httpClient.post<IProducto>(`${this.apiUrl}/Products`, producto);
  } */
}
