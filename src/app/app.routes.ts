import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { HelpComponent } from './pages/help/help.component';

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
    }
];
