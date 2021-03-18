import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private authSvc: AuthService, private router: Router) { }

  async onLogin(email, password){
    try{
      const user = await this.authSvc.login(email.value, password.value);
      if (user){
        const isVerify = this.authSvc.isEmailVerified(user);
        console.log('Veri ->', isVerify);
        this.redirectUser(isVerify);
      }
    }catch (error){
      console.log(error);
    }
  }

  async onLoginGoogle(){
    try {
      const user = await this.authSvc.loginGoogle();
      if (user){
        const isVerify = this.authSvc.isEmailVerified(user);
        console.log('Veri ->', isVerify);
        this.redirectUser(isVerify);
      }
    }catch (error){
      console.log(error);
    }
  }

  private redirectUser(isVerified: boolean){
    if (isVerified){
      this.router.navigate(['/admin']);
    }else{
      this.router.navigate(['/verify-email']);
    }
  }
}
