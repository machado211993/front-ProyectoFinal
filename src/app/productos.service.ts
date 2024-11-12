import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private readonly apiUrl = '/api';

  constructor(private httpClient: HttpClient) {}

  listar(): Observable<Array<any>> {
    return this.httpClient.get<Array<any>>(`${this.apiUrl}/Products`);
  }
}
