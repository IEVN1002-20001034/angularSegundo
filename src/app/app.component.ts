import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import Ejemplo1Component from './formulario/ejemplo1/ejemplo1.component';
import ZodiacoComponent from './formulario/zodiaco/zodiaco.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Ejemplo1Component, ZodiacoComponent, CommonModule], /*Aqui se agregan las librerias */
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'angularSegundo';
}
