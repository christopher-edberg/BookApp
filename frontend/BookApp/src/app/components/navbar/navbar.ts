import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook, faQuoteLeft, faRightToBracket, faUserPlus, faRightFromBracket, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  faBook = faBook;
  faQuoteLeft = faQuoteLeft;
  faRightToBracket = faRightToBracket;
  faUserPlus = faUserPlus;
  faRightFromBracket = faRightFromBracket;
  faMoon = faMoon;
  faSun = faSun;
  constructor(
    public auth: Auth,
    private router: Router
  ) {
    const tema = localStorage.getItem('tema');
    if (tema == 'true') {
      this.darktoggle = true;
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    }
  };
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  darktoggle = false;
  darkMode(): void {
    this.darktoggle = !this.darktoggle;
    document.documentElement.setAttribute('data-bs-theme', this.darktoggle ? 'dark' : 'light');
    localStorage.setItem('tema', String(this.darktoggle));
  }

}
