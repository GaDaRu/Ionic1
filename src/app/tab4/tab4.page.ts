import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  constructor(private router: Router) { }

  public setResult(value) {
    document.getElementById('number').innerHTML = value;
  }

  public getResult() {
    return(document.getElementById('number').innerHTML);
  }

  public add(key){
    const result = this.getResult();
    if (result !== '0' || isNaN(key)) { this.setResult(result + key); }
    else { this.setResult(key); }
  }

  public call(){
    window.open('tel:' + this.getResult(), '_system');
    this.setResult(0);
    this.router.navigate(['/admin']);
  }
}
