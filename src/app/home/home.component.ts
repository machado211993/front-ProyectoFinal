import { Component, OnInit } from '@angular/core';
import { ProductoListComponent } from '../productos/producto-list/producto-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductoListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
