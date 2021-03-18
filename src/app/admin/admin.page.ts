import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {

  constructor(private authSvc: AuthService, private router: Router) { }

  async exit(){
    await this.authSvc.logout();
    this.router.navigate(['/login']);
  }
}
