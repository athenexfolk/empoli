import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  protected readonly sidebarService = inject(SidebarService);
}
