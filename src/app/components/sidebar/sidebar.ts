import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  router = inject(Router);
  onSignOut() {
    localStorage.removeItem('leaveUser');
    this.router.navigateByUrl('/auth');
  }
}
