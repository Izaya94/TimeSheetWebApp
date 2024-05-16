import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { HelpComponent } from './pages/help/help.component';
import { RegisterComponent } from './pages/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ToastDemoComponent } from './pages/toast-demo/toast-demo.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path:'login',
        component: LoginComponent,
    },
    {
        path:'help',
        component: HelpComponent,
    },
    {
        path:'register',
        component: RegisterComponent,
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
    }
];
