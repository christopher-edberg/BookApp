import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Books } from './pages/books/books'
import { CreateBook } from './pages/create-book/create-book';
import { EditBook } from './pages/edit-book/edit-book';
import { Quotes } from './pages/quotes/quotes';
import { CreateQuote } from './pages/create-quote/create-quote';
import { EditQuote } from './pages/edit-quote/edit-quote';
import { authGuard } from './guards/auth-guard';
export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'books',
    component: Books
  },
  {
    path: 'books/create',
    component: CreateBook,
    canActivate: [authGuard]
  },
  {
    path: 'books/edit/:id',
    component: EditBook,
    canActivate: [authGuard]
  },
  {
    path: 'quotes',
    component: Quotes,
    canActivate: [authGuard]
  },
  {
    path: 'quotes/create',
    component: CreateQuote,
    canActivate: [authGuard]
  },
  {
    path: 'quotes/edit/:id',
    component: EditQuote,
    canActivate: [authGuard]
  }



];
