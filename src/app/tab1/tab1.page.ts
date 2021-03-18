import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {

  constructor() { }

  public setResult(value) {
    document.getElementById('result').innerHTML = value;
  }

  public getResult() {
    return(document.getElementById('result').innerHTML);
  }

  public add(key) {
    const result = this.getResult();
    if (result !== '0' || isNaN(key)) { this.setResult(result + key); }
    else { this.setResult(key); }
  }

  public calc() {
    const result = eval(this.getResult());
    this.setResult(result);
  }

  public del() {
    this.setResult(0);
  }
}
