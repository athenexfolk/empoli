import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Toast } from '../../components/toast/toast';

@Component({
    selector: 'app-primary-layout',
    imports: [RouterOutlet, Header, Sidebar, Toast],
    templateUrl: './primary-layout.html',
    styleUrl: './primary-layout.css',
})
export class PrimaryLayout {}
