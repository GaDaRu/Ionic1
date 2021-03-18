import { Component } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  constructor() { }

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
    this.setResult(0);
  }
}
