import { Component } from '@angular/core';
import {Photo} from '../models/photo.interface';
import {PhotoService} from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {

  public photos: Photo[] = [];

  constructor(private photoSvc: PhotoService) {
    this.photos = photoSvc.getPhotos();
  }

  /*ngOninit(){
    this.photoSvc.loadSaved().then(() => {
      this.photos = this.photoSvc.getPhotos(); /!*En caso de dar error con las fotos esto lo borramos*!/
    });
  }*/

  async ngOninit(){
    await this.photoSvc.loadSaved();
  }

  public newPhoto(): void{
    this.photoSvc.addNewToGallery();
  }
}
