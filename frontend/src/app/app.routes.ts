import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // home or landing page
  {
    path: '',
    title: 'Chrome Seconds - Home',
    loadComponent: () =>
      import('./features/home-page/home-page.component').then(
        (c) => c.HomePageComponent
      ),
  },

  // products routes
  {
    path: 'products',
    title: 'Chrome Seconds - Products',
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './features/products/products-page/products-page.component'
          ).then((c) => c.ProductsPageComponent),
      },
      {
        path: 'watch/:id',
        title: 'Chrome Seconds - Products details',
        loadComponent: () =>
          import(
            './features/products/product-details-page/product-details-page.component'
          ).then((c) => c.ProductDetailsPageComponent),
      },
    ],
  },

  // about page
  {
    path: 'about',
    title: 'Chrome Seconds - About',
    loadComponent: () =>
      import('./features/about-page/about-page.component').then(
        (c) => c.AboutPageComponent
      ),
  },

  // contact page
  {
    path: 'contact',
    title: 'Chrome Seconds - Contact',
    loadComponent: () =>
      import('./features/contact-page/contact-page.component').then(
        (c) => c.ContactPageComponent
      ),
  },

  // loged in user routes with auth guard
  {
    path: 'user',
    title: 'Chrome Seconds - User',
    // guard to check if user is logged in 
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/user/profile-page/profile-page.component').then(
            (c) => c.ProfilePageComponent
          ),
      },
    ],
  },

  // loged in user routes with auth guard 
  {
    path: 'cart',
    title: 'Chrome Seconds - Cart',
    // guard to check if user is logged in 
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/user/cart-page/cart-page.component').then(
        (c) => c.CartPageComponent
      ),
  },

  //   auth routes , login and signup
  {
    path: 'signup',
    title: 'Chrome Seconds - SignUp',
    // write auth guard to check if user has already log in
    loadComponent: () =>
      import('./features/user/auth/signup-page/signup-page.component').then(
        (c) => c.SignupPageComponent
      ),
  },

  // login path 
  {
    path: 'login',
    title: 'Chrome Seconds - Login',
    // write auth guard to check if user has already log in
    loadComponent: () =>
      import('./features/user/auth/login-page/login-page.component').then(
        (c) => c.LoginPageComponent
      ),
  },

];