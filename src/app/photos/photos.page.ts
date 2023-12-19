import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {

  constructor(private router: Router) { }
  ngOnInit() {
    this.carregarImagensDoLocalStorage()
  }
  colectionPhotos: any = [];
  numberphoto: number = 0;

  async carregarImagensDoLocalStorage() {
    console.log("oi")
    const numberPhotos = localStorage.getItem('numeroDeFotos');
    this.numberphoto = numberPhotos !== null ? parseInt(numberPhotos, 10) : 0
    for (let i = 1; i <= this.numberphoto; i++) {
      const chaveDaFoto = 'Photo' + i.toString();
      const imagemArmazenada = localStorage.getItem(chaveDaFoto);
      if (imagemArmazenada) {
        this.colectionPhotos.push(imagemArmazenada);
      }
    }
  }
  menu() {
    this.router.navigate(['/home']);
  }

}
