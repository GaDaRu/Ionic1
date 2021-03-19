import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page {

  constructor() {}

  public onLoad(){
    console.log('Hola como estamos todos');
    // document.querySelectorAll('ion-tab').forEach(function(t) { this.printList(t); });
  }

  public getTab() {
    return(document.querySelector('ion-tab:not(.tab-hidden)'));
  }

  public getList(tab = this.getTab()) {
    console.log('Entra aqi');
    const list = localStorage.getItem('whole-list-' + tab);
    console.log('Que da aqi ' + list );
    return list ? JSON.parse(list) : [];
  }

  public saveList(tab, list) {
    localStorage.setItem('whole-list-' + tab, JSON.stringify(list));
    this.printList(tab);
  }

  public printList(tab) {
    tab.querySelector('ion-list').innerHTML = '';
    this.getList(tab).forEach((item, index) => {
      tab.querySelector('ion-list').innerHTML +=
        `<ion-item-sliding>
           <ion-item (click)="addEditItem(` + index + `)">
             <ion-label text-wrap>
               <h2>` + item.text + `</h2>
               <p>` + item.date.slice(0, 10) + `</p>
             </ion-label>
          </ion-item>
          <ion-item-options side="start">
            <ion-item-option  color="danger" (click)="deleteItem(` + index + `)">
                <ion-icon slot="icon-only" name="trash"></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>`;
    });
  }

  public error(message) {
    const alert = document.createElement('ion-alert');
    alert.message = message;
    alert.buttons = ['OK'];
    document.querySelector('ion-app').appendChild(alert);
    alert.present();
  }

  public closeItems() {
    this.getTab().querySelector('ion-list').closeSlidingItems();
  }

  public addEditItem(index = false) {
    this.closeItems();
    const list = this.getList();
    let item = null;
    if (index !== false) { // @ts-ignore
      item = list[ index ]; }
    else { item = { text: '', date: new Date().toISOString(), icon: 'radio-button-off' }; }
    const modal = document.createElement('ion-modal');
    modal.component = document.createElement('div');
    modal.component.innerHTML = `
        <ion-header>
            <ion-toolbar>
                <ion-title>Tareas - ` + (index !== false ? 'Editar Tarea' : 'Nueva Tarea') + `</ion-title>
                <ion-buttons slot="primary">
                    <ion-button color="danger"><ion-icon slot="icon-only" name="close"></ion-icon></ion-button>
                    <ion-button color="primary"><ion-icon slot="icon-only" name="checkmark"></ion-icon></ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-label position="floating">Seleccionar fecha</ion-label>
                    <ion-datetime display-format="D MMM YYYY" max="2050-12-31" value="` + item.date + `"></ion-datetime>
                </ion-item>
                <ion-item>
                    <ion-label position="floating">Añadir Tarea</ion-label>
                    <ion-input value="` + item.text + `"></ion-input>
                </ion-item>
            </ion-list>
        </ion-content>`;
    modal.component.querySelector('[color="danger"]').addEventListener('click', () => {
      modal.dismiss();
    });
    modal.component.querySelector('[color="primary"]').addEventListener('click', () => {
      const newDate = document.querySelector('ion-datetime').value;
      const newText = document.querySelector('ion-input').value;
      console.log('Fecha ' + newDate);
      console.log('Texto ' + newText);
      // @ts-ignore
      if (!newText.length) {
        this.error('Este campo "Añadir Tarea" no puede estar vacío');
      }
      else {
        const newItem = { text: newText, date: newDate };
        if (index !== false) { // @ts-ignore
          list[ index ] = newItem; console.log('Index = true'); }
        else { list.unshift(newItem); console.log('Index = false'); }
        this.saveList(this.getTab(), list);
        modal.dismiss();
      }
    });
    document.querySelector('ion-app').appendChild(modal);
    modal.present();
  }

  public deleteItem(index = false) {
    const alert = document.createElement('ion-alert');

    alert.header = index !== false ? 'Borrar Tarea' : 'Borrar todo',
      alert.message = '¿Estas seguro?',
      alert.buttons =
        [{
          text: 'SI',
          handler: () => {
            const list = this.getList();
            if (index !== false) { list.splice(index, 1); }
            else { list.length = 0; }
            this.saveList(this.getTab(), list);
          }
        }, {
          text: 'NO',
          role: 'cancelar'
        }];
    document.querySelector('ion-app').appendChild(alert);
    alert.present();
  }

}
