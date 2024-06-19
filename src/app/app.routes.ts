import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { HelpComponent } from './pages/help/help.component';
import { RegisterComponent } from './pages/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ToastDemoComponent } from './pages/toast-demo/toast-demo.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TaskForm1Component } from './pages/task-form-1/task-form-1.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { authGuard } from './services/auth.guard';
import { AccountComponent } from './pages/account/account.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path:'home',
        component: HomeComponent

    },
    {
        path:'login',
        component: LoginComponent,
    },
    {
        path:'account',
        component: AccountComponent,
        canActivate: [authGuard], data: { roles: ['Admin', 'User'] } 
    },
    {
        path:'help',
        component: HelpComponent,
    },
    {
        path:'register',
        component: RegisterComponent,
        canActivate: [authGuard], data: { roles: ['Admin'] } 
    },
    {
        path: 'about',
        component: AboutComponent,
    },
    {
        path: 'contact',
        component: ContactComponent,

    },
    {
        path: 'toast-demo',
        component: ToastDemoComponent,
        canActivate: [authGuard], data: { roles: ['Admin', 'User'] } 
    },
    {
        path: 'task-form',
        component: TaskFormComponent,
        canActivate: [authGuard], data: { roles: ['Admin', 'User'] } 
    },
    {
        path: 'task-form-1',
        component: TaskForm1Component,
        canActivate: [authGuard], data: { roles: ['Admin', 'User'] } 
    },
    {
        path: 'calendar',
        component: CalendarComponent,
        canActivate: [authGuard], data: { roles: ['Admin', 'User'] } 
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];
