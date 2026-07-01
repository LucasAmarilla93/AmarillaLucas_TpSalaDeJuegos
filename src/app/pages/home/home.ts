import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
}
