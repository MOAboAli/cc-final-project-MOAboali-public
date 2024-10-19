import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { EdituserComponent } from './edituser/edituser.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: HomeComponent },
    { path: 'edituser', component: EdituserComponent },
    { path: '**', component: HomeComponent, pathMatch: 'full' }

];