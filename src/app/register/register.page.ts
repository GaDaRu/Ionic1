import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authSVC: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onRegister(email, password){
    try {
      const user = await this.authSVC.register(email.value, password.value);
      if (user){
        const isVerified = this.authSVC.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    }catch (error){
      console.log(error);
    }
  }

  private redirectUser(isVerified: boolean){
    if (isVerified){
      this.router.navigate(['admin']);
    }else{
      this.router.navigate(['verify-email']);
    }
  }
}
