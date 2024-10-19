import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { userdata } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'frontend';
  userdata: userdata | null = null;
  private router = inject(Router);

  constructor() {
    const userString = localStorage.getItem("user");
    if (!userString) return;
    this.userdata = JSON.parse(userString);
  }


  onSubmit(): void {
    localStorage.removeItem("user");
    this.userdata = null;
    this.router.navigateByUrl('/login')
  }
}
