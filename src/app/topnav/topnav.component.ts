import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import {
  faRightFromBracket,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarritoIconComponent } from '../carrito/carrito-icon/carrito-icon.component';

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    CarritoIconComponent,
  ],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.css',
})
export class TopnavComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  faSignIn = faRightToBracket;
  faSignOut = faRightFromBracket;
  isAdmin = false;

  private authSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    // Asegúrate de que authService.isLoggedIn$ emite cambios correctamente
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn;
        this.isAdmin = this.authService.isAdmin();  // Asegúrate de que el rol se obtiene de manera actualizada
      }
    );
  }


  ngOnDestroy(): void { /*ciclo de vida componente*/
    this.authSubscription.unsubscribe();
  }

  login(): void {  /*login*/
    this.router.navigate(['/login']);
  }

  logout(): void {  /*cerrar sesión*/
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
