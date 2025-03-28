import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../app/common/header/header.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NgIf, HeaderComponent],
    templateUrl: './app.component.html',
    standalone: true,
})
export class AppComponent {
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); 
  }
}