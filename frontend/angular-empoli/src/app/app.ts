import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './core/components/sidebar/sidebar';
import { Header } from "./core/components/header/header";
import { Toast } from './core/components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Header, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'angular-empoli';
}
