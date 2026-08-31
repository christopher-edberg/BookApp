import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from './components/navbar/navbar';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FontAwesomeModule,Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('BookApp');
  faBook = faBook;
}
